import { PrismaClient } from "@prisma/client";
import { BRAND_PRESETS } from "../lib/design-tokens";
import { carouselSchema, TEMPLATE_SLUGS } from "../lib/schemas/carousel";
import { SEED_CAROUSELS } from "../lib/schemas/seed-carousels";

const prisma = new PrismaClient();

const templateMeta: Record<(typeof TEMPLATE_SLUGS)[number], { name: string; description: string }> = {
  hook: { name: "Hook", description: "Portada de curiosidad con poco texto" },
  "ab-compare": { name: "Comparativa A/B", description: "Barras de progreso horizontales" },
  "stat-hero": { name: "Stat hero", description: "Un número grande y una frase" },
  steps: { name: "Pasos", description: "Proceso de 2–3 pasos" },
  "phone-mock": {
    name: "Phone mock",
    description: "Maqueta móvil / laptop / browser + caption",
  },
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
  "slate-coral": "brand-slate-coral",
  "forest-signal": "brand-forest",
  "ink-mono": "brand-ink-mono",
  "sand-teal": "brand-sand-teal",
  "midnight-amber": "brand-midnight",
  "studio-graphite": "brand-graphite",
};

async function main() {
  const brandKitByPreset: Record<string, string> = {};

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
    brandKitByPreset[key] = kit.id;
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

  let created = 0;
  let refreshed = 0;

  for (const entry of SEED_CAROUSELS) {
    const content = carouselSchema.parse(entry.content);
    const brandKitId =
      brandKitByPreset[entry.brandPresetKey] ?? brandKitByPreset["light-infographic"];
    const promptMeta = JSON.stringify({ source: "seed", arc: entry.arc });

    const existing = await prisma.post.findFirst({
      where: { title: content.title },
      include: { versions: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    if (existing) {
      const latest = existing.versions[0];
      await prisma.post.update({
        where: { id: existing.id },
        data: {
          topic: content.topic,
          tags: JSON.stringify(content.tags),
          status: "ready",
          origin: "template",
          brandKitId,
        },
      });
      if (latest) {
        await prisma.postVersion.update({
          where: { id: latest.id },
          data: { contentJson: JSON.stringify(content), promptMeta },
        });
      } else {
        await prisma.postVersion.create({
          data: {
            postId: existing.id,
            contentJson: JSON.stringify(content),
            promptMeta,
          },
        });
      }
      refreshed += 1;
      continue;
    }

    await prisma.post.create({
      data: {
        title: content.title,
        topic: content.topic,
        tags: JSON.stringify(content.tags),
        status: "ready",
        origin: "template",
        brandKitId,
        versions: {
          create: {
            contentJson: JSON.stringify(content),
            promptMeta,
          },
        },
      },
    });
    created += 1;
  }

  const seedTitles = SEED_CAROUSELS.map((e) => e.content.title);
  const backfilled = await prisma.post.updateMany({
    where: { title: { in: seedTitles } },
    data: { origin: "template" },
  });

  console.log("Seed OK:", {
    brandKits: Object.keys(BRAND_PRESETS).length,
    templates: TEMPLATE_SLUGS.length,
    seedCarousels: SEED_CAROUSELS.length,
    created,
    refreshed,
    originBackfilled: backfilled.count,
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
