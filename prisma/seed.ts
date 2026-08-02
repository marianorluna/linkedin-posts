import { PrismaClient } from "@prisma/client";
import { BRAND_PRESETS } from "../lib/design-tokens";
import { sampleCarousel, sampleProcessCarousel, TEMPLATE_SLUGS } from "../lib/schemas/carousel";

const prisma = new PrismaClient();

const templateMeta: Record<(typeof TEMPLATE_SLUGS)[number], { name: string; description: string }> = {
  hook: { name: "Hook", description: "Portada de curiosidad con poco texto" },
  "ab-compare": { name: "Comparativa A/B", description: "Barras de progreso horizontales" },
  "stat-hero": { name: "Stat hero", description: "Un número grande y una frase" },
  steps: { name: "Pasos", description: "Proceso de 2–3 pasos" },
  "phone-mock": { name: "Phone mock", description: "Maqueta de teléfono + caption" },
  cta: { name: "CTA", description: "Cierre con pregunta o llamada a acción" },
  "vs-split": { name: "VS split", description: "Comparativa dos columnas con eje de iconos" },
  "ribbon-steps": { name: "Ribbon steps", description: "Banners numerados tipo cinta" },
  "icon-rows": { name: "Icon rows", description: "Filas alternadas con icono vectorial" },
  "icon-bento": { name: "Icon bento", description: "Grid de celdas icono + label" },
};

const kitIds: Record<string, string> = {
  "wireframe-studio": "brand-default",
  "light-infographic": "brand-light",
  "bold-compare": "brand-bold",
  "tech-blue": "brand-tech",
};

async function main() {
  let lightKitId = "brand-light";

  for (const [key, preset] of Object.entries(BRAND_PRESETS)) {
    const id = kitIds[key] ?? `brand-${key}`;
    const kit = await prisma.brandKit.upsert({
      where: { id },
      update: {
        name: preset.name,
        tokensJson: JSON.stringify(preset.tokens),
      },
      create: {
        id,
        name: preset.name,
        tokensJson: JSON.stringify(preset.tokens),
      },
    });
    if (key === "light-infographic") lightKitId = kit.id;
  }

  for (const slug of TEMPLATE_SLUGS) {
    const meta = templateMeta[slug];
    await prisma.template.upsert({
      where: { slug },
      update: { name: meta.name, description: meta.description },
      create: {
        slug,
        name: meta.name,
        description: meta.description,
        schemaVersion: 1,
      },
    });
  }

  const existing = await prisma.post.findFirst({
    where: { title: sampleCarousel.title },
  });

  if (!existing) {
    await prisma.post.create({
      data: {
        title: sampleCarousel.title,
        topic: sampleCarousel.topic,
        tags: JSON.stringify(sampleCarousel.tags),
        status: "ready",
        brandKitId: lightKitId,
        versions: {
          create: {
            contentJson: JSON.stringify(sampleCarousel),
            promptMeta: JSON.stringify({ source: "seed", arc: "contrast" }),
          },
        },
      },
    });
  }

  const existingProcess = await prisma.post.findFirst({
    where: { title: sampleProcessCarousel.title },
  });

  if (!existingProcess) {
    await prisma.post.create({
      data: {
        title: sampleProcessCarousel.title,
        topic: sampleProcessCarousel.topic,
        tags: JSON.stringify(sampleProcessCarousel.tags),
        status: "ready",
        brandKitId: lightKitId,
        versions: {
          create: {
            contentJson: JSON.stringify(sampleProcessCarousel),
            promptMeta: JSON.stringify({ source: "seed", arc: "process" }),
          },
        },
      },
    });
  }

  console.log("Seed OK:", {
    brandKits: Object.keys(BRAND_PRESETS).length,
    templates: TEMPLATE_SLUGS.length,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
