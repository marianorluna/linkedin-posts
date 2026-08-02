---
name: nueva-plantilla
description: Crear una plantilla de slide LinkedIn nueva desde brief o imágenes de referencia (schema Zod + React + studio + LLM + seed).
---

# Nueva plantilla de slide

Usa este skill cuando el usuario pida una plantilla nueva, un layout inspirado en refs de `assets/`, o “crear template desde prompt/imagen”.

## Principios

- El layout es React en `components/slides/*` (no Midjourney/DALL·E, no HTML libre).
- **Preferir variante** (`lib/schemas/variants.ts` + switch en el componente) antes de crear una plantilla nueva.
- El LLM de `/api/generate` solo elige slugs del catálogo, variants y `visual`; **no** genera componentes en runtime.
- Iconografía: catálogo SVG en `lib/icons/registry.ts` + `SlideIcon`. No emojis Unicode.
- Estilo vía BrandKit (`--slide-*`, moods, presets) + EpisodeVisual opcional (`carousel.visual`). No inventes paletas ad hoc.

## Workflow

1. **Brief visual:** leer refs en `assets/` o las adjuntas + prompt del usuario. Elegir: **variante de existente** o patrón nuevo (`vs` / `ribbon` / `rows` / `bento`).
2. Si basta una silueta distinta con la misma data → añadir variant al mapa + case en el componente. **No** crear template.
3. **Contrato Zod** en `lib/schemas/carousel.ts` solo si es plantilla nueva:
   - Nuevo `*SlideSchema` con `template` literal, `variant` opcional y `data` tipado.
   - Límites de chars cortos.
   - `icon` / `icons` con `z.enum(ICON_IDS)` si aplica.
   - Añadir a `slideSchema`, `TEMPLATE_SLUGS`, `TEMPLATE_VARIANTS` y opcionalmente `sampleCarousel`.
4. **Componente** `components/slides/XxxSlide.tsx`:
   - Usar `SlideFrame` + primitives (`PillLabel`, `NumberBadge`, `VsDivider`, `RibbonBar`, `IconWell`).
   - Envolver bloques editables con `LayoutSlot` y registrar slots en `TEMPLATE_SLOTS` (`lib/schemas/layout.ts`).
   - Usar `SlideIcon` y CSS vars del BrandKit. Clase `slot-text` en tipografías overrideables.
5. **Registro** en `components/slides/SlideRenderer.tsx` (case exhaustivo + `resolveVariant`).
6. **Studio** en `components/studio/StudioEditor.tsx`:
   - `emptySlide` + `SlideFields` (+ `IconPicker` si hay iconos). El selector de variante usa `TEMPLATE_VARIANTS`.
7. **LLM** `lib/infra/llm.ts`: documentar slug/variants y campos en `SYSTEM_PROMPT`.
8. **Seed** `prisma/seed.ts`: entrada en `templateMeta` (solo plantillas nuevas).
9. **Docs:** actualizar `AGENTS.md` catálogo si cambia la estructura típica.
10. **Smoke:** preview en `/posts/new` con la plantilla/variante añadida.

## Checklist

- [ ] ¿Se resolvió con variant? Si sí, no hace falta template nuevo
- [ ] Schema + TEMPLATE_SLUGS + TEMPLATE_VARIANTS
- [ ] Componente + SlideRenderer
- [ ] emptySlide + SlideFields
- [ ] SYSTEM_PROMPT / arcs si aplica
- [ ] seed templateMeta (plantilla nueva)
- [ ] Iconos del catálogo (si aplica); si falta un icono, añadirlo a `ICON_IDS` + paths en `SlideIcon`
- [ ] Sin colores hardcodeados fuera de tokens / EpisodeVisual
