# AGENTS.md — Studio Infografías LinkedIn

## Qué es

Studio local para carruseles LinkedIn: diapositivas React **1080×1080**, contenido JSON tipado (Zod), historial en SQLite y export **PDF multipágina**.

No uses Midjourney/DALL·E para el layout. El layout vive en `components/slides/*`.

## Arquitectura

- **Plantillas (Template Method / Strategy):** `components/slides/`
- **Contrato de contenido:** `lib/schemas/carousel.ts`
- **Design tokens:** `lib/design-tokens.ts`
- **Dominio / casos de uso:** `lib/domain/`
- **Infra (Prisma, LLM, export):** `lib/infra/`
- **Studio UI:** `app/page.tsx`, `app/posts/*`, `components/studio/`
- **Render limpio para screenshot:** `app/render/[versionId]`

## Flujo habitual

1. Brief → `/api/generate` o editar JSON/campos en el studio.
2. Validar con `carouselSchema`.
3. Guardar versión (`Post` + `PostVersion`).
4. Export PDF: `/api/export` (Playwright + pdf-lib). Requiere `pnpm dev` en `NEXT_PUBLIC_APP_URL`.
5. Subir el PDF a LinkedIn como documento.

## Comandos

```bash
pnpm install
pnpm db:setup
pnpm dev
```

## Reglas para el agente

- Mantén el estilo del BrandKit; no inventes paletas ni tipografías nuevas en cada post.
- 1 idea por slide; copy corto (respeta máximos Zod).
- Estructura de carrusel: `hook` → valor (`ab-compare` / `stat-hero` / `steps` / `phone-mock`) → `cta`.
- Al crear contenido nuevo, rellena el schema; no generes HTML libre de slides.
- No commits de `.env`, `*.db`, ni `storage/exports/`.
- No despliegues Coolify/Docker salvo que el usuario lo pida.

## Skill relacionada

`.cursor/skills/nuevo-carrusel/SKILL.md` — workflow para un carrusel nuevo.
