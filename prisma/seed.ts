import { PrismaClient } from "@prisma/client";
import { defaultBrandTokens } from "../lib/design-tokens";
import { sampleCarousel, TEMPLATE_SLUGS } from "../lib/schemas/carousel";

const prisma = new PrismaClient();

const templateMeta: Record<(typeof TEMPLATE_SLUGS)[number], { name: string; description: string }> = {
  hook: { name: "Hook", description: "Portada de curiosidad con poco texto" },
  "ab-compare": { name: "Comparativa A/B", description: "Barras de progreso horizontales" },
  "stat-hero": { name: "Stat hero", description: "Un número grande y una frase" },
  steps: { name: "Pasos", description: "Proceso de 2–3 pasos" },
  "phone-mock": { name: "Phone mock", description: "Maqueta de teléfono + caption" },
  cta: { name: "CTA", description: "Cierre con pregunta o llamada a acción" },
};

async function main() {
  const brandKit = await prisma.brandKit.upsert({
    where: { id: "brand-default" },
    update: {
      name: "Wireframe Studio",
      tokensJson: JSON.stringify(defaultBrandTokens),
    },
    create: {
      id: "brand-default",
      name: "Wireframe Studio",
      tokensJson: JSON.stringify(defaultBrandTokens),
    },
  });

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
        brandKitId: brandKit.id,
        versions: {
          create: {
            contentJson: JSON.stringify(sampleCarousel),
            promptMeta: JSON.stringify({ source: "seed" }),
          },
        },
      },
    });
  }

  console.log("Seed OK:", { brandKit: brandKit.name, templates: TEMPLATE_SLUGS.length });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
