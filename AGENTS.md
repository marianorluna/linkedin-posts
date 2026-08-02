# AGENTS.md — Studio Infografías LinkedIn

## Qué es

Studio local para carruseles LinkedIn: diapositivas React **1080×1080**, contenido JSON tipado (Zod), historial en SQLite y export **PDF multipágina**.

No uses Midjourney/DALL·E para el layout. El layout vive en `components/slides/*`.

## Arquitectura

- **Plantillas (Template Method / Strategy):** `components/slides/`
- **Primitives de forma:** `components/slides/primitives/`
- **Iconos SVG:** `lib/icons/registry.ts`, `components/icons/SlideIcon.tsx`
- **Contrato de contenido:** `lib/schemas/carousel.ts` (+ `layout` opcional por slide)
- **Slots de layout:** `lib/schemas/layout.ts`, `components/slides/layout/LayoutSlot.tsx`
- **Design tokens / presets:** `lib/design-tokens.ts` (moods, font pairs, BrandKit)
- **Dominio / casos de uso:** `lib/domain/` (`brand-kit-service`, `layout`, posts)
- **Infra (Prisma, LLM, export):** `lib/infra/`
- **Studio UI:** `app/page.tsx`, `app/posts/*`, `components/studio/` (StylePanel, IconPicker, LayoutPanel)
- **Render limpio para screenshot:** `app/render/[versionId]`

## Catálogo de plantillas

| Slug | Uso |
|------|-----|
| `hook` | Portada |
| `ab-compare` | Dos % horizontales |
| `stat-hero` | Número grande |
| `steps` | 2–3 pasos |
| `phone-mock` | Maqueta móvil |
| `cta` | Cierre |
| `vs-split` | Comparativa A/B + eje de iconos |
| `ribbon-steps` | Banners numerados |
| `icon-rows` | Filas con icono |
| `icon-bento` | Grid de celdas |

## Estilo

- BrandKits / presets: Wireframe Studio, Light Infographic (default nuevos posts), Bold Compare, Tech Blue.
- Moods: `dark-wire` | `light-flat` | `bold-blocks`.
- Tipografías: pares `syne-instrument` | `space-grotesk` | `dm-sans`.
- Iconos: solo IDs del catálogo SVG (no emojis).
- Editar estilo en el panel BrandKit del studio; no inventar paletas por post.

## Flujo habitual

1. Brief → `/api/generate` o editar JSON/campos en el studio.
2. Validar con `carouselSchema`.
3. Ajustar BrandKit (preset / colores / mood) en el StylePanel.
4. Opcional: **Editar layout** — mover/redimensionar slots (x,y,w,h) y tipografía (fontSize, bold, italic).
5. Guardar versión (`Post` + `PostVersion`).
6. Export PDF: `/api/export` (Playwright + pdf-lib). Requiere `pnpm dev` en `NEXT_PUBLIC_APP_URL`.
7. Subir el PDF a LinkedIn como documento.

## Comandos

```bash
pnpm install
pnpm db:setup
pnpm dev
```

## Reglas para el agente

- Mantén el estilo del BrandKit; usa presets antes de inventar colores.
- 1 idea por slide; copy corto (respeta máximos Zod).
- Estructura: `hook` → valor (`vs-split` / `ribbon-steps` / `icon-bento` / `icon-rows` / `ab-compare` / `stat-hero` / `steps` / `phone-mock`) → `cta`.
- Al crear contenido nuevo, rellena el schema; no generes HTML libre de slides.
- `layout` por slide es opcional; omítelo salvo que el usuario pida composición custom (coords 1080×1080).
- Plantilla nueva: seguir `.cursor/skills/nueva-plantilla/SKILL.md`.
- No commits de `.env`, `*.db`, ni `storage/exports/`.
- No despliegues Coolify/Docker salvo que el usuario lo pida.

## Skills

- `.cursor/skills/nuevo-carrusel/SKILL.md` — carrusel nuevo (contenido).
- `.cursor/skills/nueva-plantilla/SKILL.md` — plantilla nueva (código + schema).
