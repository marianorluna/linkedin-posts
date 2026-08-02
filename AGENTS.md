# AGENTS.md — Studio Infografías LinkedIn

## Qué es

Studio local para carruseles LinkedIn: diapositivas React **1080×1080**, contenido JSON tipado (Zod), historial en SQLite y export **PDF multipágina**.

No uses Midjourney/DALL·E para el layout. El layout vive en `components/slides/*`.

## Arquitectura

- **Plantillas (Template Method / Strategy):** `components/slides/`
- **Variantes de silueta:** `lib/schemas/variants.ts` + switch en cada slide
- **EpisodeVisual (Decorator):** `carousel.visual` → `lib/domain/episode-visual.ts` + motifs en `SlideFrame`
- **Arcos narrativos:** `lib/domain/narrative-arcs.ts`
- **Primitives de forma:** `components/slides/primitives/`
- **Iconos SVG:** `lib/icons/registry.ts`, `components/icons/SlideIcon.tsx`
- **Contrato de contenido:** `lib/schemas/carousel.ts` (+ `layout` / `variant` opcionales por slide)
- **Slots de layout:** `lib/schemas/layout.ts`, `components/slides/layout/LayoutSlot.tsx`
- **Design tokens / presets:** `lib/design-tokens.ts` (moods, font pairs, BrandKit)
- **Dominio / casos de uso:** `lib/domain/` (`brand-kit-service`, `episode-visual`, `narrative-arcs`, `layout`, posts)
- **Infra (Prisma, LLM, export):** `lib/infra/`
- **Studio UI:** `app/page.tsx`, `app/posts/*`, `components/studio/` (StylePanel, EpisodePanel, IconPicker, LayoutPanel)
- **Render limpio para screenshot:** `app/render/[versionId]`

## Catálogo de plantillas

| Slug | Uso | Variants |
|------|-----|----------|
| `hook` | Portada | `split-icon`, `centered`, `type-dominant` |
| `ab-compare` | Dos % horizontales | `default` |
| `stat-hero` | Número grande | `stack`, `watermark`, `left-rail` |
| `steps` | 2–3 pasos | `default` |
| `phone-mock` | Maqueta móvil | `default` |
| `cta` | Cierre | `centered`, `bottom-bar`, `question-big` |
| `vs-split` | Comparativa A/B + eje de iconos | `columns`, `stacked-cards` |
| `ribbon-steps` | Banners numerados | `diagonal`, `numbered-rail` |
| `icon-rows` | Filas con icono | `default` |
| `icon-bento` | Grid de celdas | `grid`, `hero-cell` |

## Episodio vs marca

- **BrandKit:** identidad estable (colores, tipografías, mood base). Panel Estilo.
- **`carousel.visual`:** skin del tema (motif, accentShift, contrast, mood/density override). Panel Episodio. No muta el kit en DB.
- Motifs: `orbs` | `orbs-tl` | `orbs-center` | `arcs` | `blocks` | `dots` | `grid` | `ribbons` | `bars` | `diagonal` | `none` (plano).
- Sin `visual` → decoración legacy del mood BrandKit. Con `visual.motif: none` → fondo plano (sin círculos).

## Arcos narrativos

| id | Secuencia tipica |
|----|------------------|
| `contrast` | hook → vs-split → ab-compare → cta |
| `number-story` | hook → stat-hero → icon-rows → cta |
| `process` | hook → ribbon-steps → steps → cta |
| `map` | hook → icon-bento → icon-rows → cta |
| `myth-bust` | hook → icon-rows → vs-split → cta |
| `single-punch` | hook → stat-hero → cta |

## Estilo

- BrandKits / presets: Wireframe Studio, Light Infographic (default nuevos posts), Bold Compare, Tech Blue, Slate Coral, Forest Signal, Ink Mono, Sand Teal, Midnight Amber, Studio Graphite.
- Moods: `dark-wire` | `light-flat` | `bold-blocks` | `soft-wash` | `paper-grain` | `neon-edge` | `split-tone`.
- Tipografías: `syne-instrument` | `space-grotesk` | `dm-sans` | `outfit` | `bricolage-plex` | `plex`.
- Densidad: `air` | `compact` | `tight`.
- Iconos: solo IDs del catálogo SVG (no emojis).
- Editar estilo en BrandKit; variedad por tema vía EpisodeVisual + variants + preset (no inventar paletas sueltas por post).

## Flujo habitual

1. Brief + Visual Brief (arco / hero / motivo) → `/api/generate` o editar JSON/campos en el studio.
2. Validar con `carouselSchema`.
3. Ajustar BrandKit (preset / colores / mood) en el StylePanel.
4. Ajustar Episodio (`visual`) y variantes por slide.
5. Opcional: **Editar layout** — mover/redimensionar slots (x,y,w,h) y tipografía (fontSize, bold, italic).
6. Guardar versión (`Post` + `PostVersion`).
7. Export PDF: `/api/export` (Playwright + pdf-lib). Requiere `pnpm dev` en `NEXT_PUBLIC_APP_URL`.
8. Subir el PDF a LinkedIn como documento.

## Comandos

```bash
pnpm install
pnpm db:setup
pnpm dev
```

## Reglas para el agente

- Mantén el estilo del BrandKit; usa presets antes de inventar colores.
- Diversifica siluetas: arco + `visual` + `variant` por tema nuevo.
- 1 idea por slide; copy corto (respeta máximos Zod).
- Estructura: `hook` → valor según arco → `cta`.
- Al crear contenido nuevo, rellena el schema; no generes HTML libre de slides.
- `layout` por slide es opcional; omítelo salvo que el usuario pida composición custom (coords 1080×1080).
- Preferir variant antes de plantilla nueva; plantilla nueva: `.cursor/skills/nueva-plantilla/SKILL.md`.
- No commits de `.env`, `*.db`, ni `storage/exports/`.
- No despliegues Coolify/Docker salvo que el usuario lo pida.

## Skills

- `.cursor/skills/nuevo-carrusel/SKILL.md` — carrusel nuevo (contenido + Visual Brief).
- `.cursor/skills/nueva-plantilla/SKILL.md` — plantilla o variant nueva (código + schema).
