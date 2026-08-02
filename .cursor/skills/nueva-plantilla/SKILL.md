---
name: nueva-plantilla
description: Crear una plantilla de slide LinkedIn nueva desde brief o imágenes de referencia (schema Zod + React + studio + LLM + seed).
---

# Nueva plantilla de slide

Usa este skill cuando el usuario pida una plantilla nueva, un layout inspirado en refs de `assets/`, o “crear template desde prompt/imagen”.

## Principios

- El layout es React en `components/slides/*` (no Midjourney/DALL·E, no HTML libre).
- El LLM de `/api/generate` solo elige slugs del catálogo y rellena JSON; **no** genera componentes en runtime.
- Iconografía: catálogo SVG en `lib/icons/registry.ts` + `SlideIcon`. No emojis Unicode.
- Estilo vía BrandKit (`--slide-*`, moods, presets). No inventes paletas ad hoc.

## Workflow

1. **Brief visual:** leer refs en `assets/` o las adjuntas + prompt del usuario. Elegir patrón: `vs` / `ribbon` / `rows` / `bento` / variante de existente.
2. **Contrato Zod** en `lib/schemas/carousel.ts`:
   - Nuevo `*SlideSchema` con `template` literal y `data` tipado.
   - Límites de chars cortos.
   - `icon` / `icons` con `z.enum(ICON_IDS)` si aplica.
   - Añadir a `slideSchema`, `TEMPLATE_SLUGS`, y opcionalmente `sampleCarousel`.
3. **Componente** `components/slides/XxxSlide.tsx`:
   - Usar `SlideFrame` + primitives (`PillLabel`, `NumberBadge`, `VsDivider`, `RibbonBar`, `IconWell`).
   - Usar `SlideIcon` y CSS vars del BrandKit.
4. **Registro** en `components/slides/SlideRenderer.tsx` (case exhaustivo).
5. **Studio** en `components/studio/StudioEditor.tsx`:
   - `emptySlide` + `SlideFields` (+ `IconPicker` si hay iconos).
6. **LLM** `lib/infra/llm.ts`: documentar slug y campos en `SYSTEM_PROMPT`.
7. **Seed** `prisma/seed.ts`: entrada en `templateMeta`.
8. **Docs:** actualizar `AGENTS.md` catálogo si cambia la estructura típica.
9. **Smoke:** preview en `/posts/new` con la plantilla añadida.

## Checklist

- [ ] Schema + TEMPLATE_SLUGS
- [ ] Componente + SlideRenderer
- [ ] emptySlide + SlideFields
- [ ] SYSTEM_PROMPT
- [ ] seed templateMeta
- [ ] Iconos del catálogo (si aplica); si falta un icono, añadirlo a `ICON_IDS` + paths en `SlideIcon`
- [ ] Sin colores hardcodeados fuera de tokens
