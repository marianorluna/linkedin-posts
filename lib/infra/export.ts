import { createHash } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { chromium } from "playwright";
import { prisma } from "@/lib/infra/prisma";
import { getVersion } from "@/lib/domain/post-service";
import { SLIDE_SIZE } from "@/lib/design-tokens";

function exportsRoot() {
  return path.join(process.cwd(), "storage", "exports");
}

function appBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function exportVersionToPdf(versionId: string) {
  const version = await getVersion(versionId);
  if (!version) {
    throw new Error("Versión no encontrada");
  }

  const slideCount = version.content.slides.length;
  const outDir = path.join(exportsRoot(), version.postId, versionId);
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const pngBuffers: Buffer[] = [];

  try {
    const page = await browser.newPage({
      viewport: { width: SLIDE_SIZE, height: SLIDE_SIZE },
      deviceScaleFactor: 1,
    });

    for (let i = 0; i < slideCount; i += 1) {
      const url = `${appBaseUrl()}/render/${versionId}?slide=${i}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForSelector("[data-slide-frame]");
      const frame = page.locator("[data-slide-frame]");
      const buffer = await frame.screenshot({ type: "png" });
      const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
      await writeFile(pngPath, buffer);
      pngBuffers.push(Buffer.from(buffer));

      await prisma.exportAsset.create({
        data: {
          versionId,
          format: "png",
          path: path.relative(process.cwd(), pngPath).replace(/\\/g, "/"),
          width: SLIDE_SIZE,
          height: SLIDE_SIZE,
          hash: createHash("sha256").update(buffer).digest("hex"),
        },
      });
    }
  } finally {
    await browser.close();
  }

  const pdf = await PDFDocument.create();
  for (const png of pngBuffers) {
    const image = await pdf.embedPng(png);
    const page = pdf.addPage([SLIDE_SIZE, SLIDE_SIZE]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: SLIDE_SIZE,
      height: SLIDE_SIZE,
    });
  }

  const pdfBytes = await pdf.save();
  const pdfPath = path.join(outDir, "carousel.pdf");
  await writeFile(pdfPath, pdfBytes);

  const asset = await prisma.exportAsset.create({
    data: {
      versionId,
      format: "pdf",
      path: path.relative(process.cwd(), pdfPath).replace(/\\/g, "/"),
      width: SLIDE_SIZE,
      height: SLIDE_SIZE,
      hash: createHash("sha256").update(pdfBytes).digest("hex"),
    },
  });

  return {
    pdfPath: asset.path,
    pngCount: pngBuffers.length,
    assetId: asset.id,
  };
}
