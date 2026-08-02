---
name: nuevo-carrusel
description: Crear o iterar un carrusel LinkedIn (brief → JSON → plantillas → preview → PDF). Úsalo cuando el usuario pida un post, carrusel, diapositivas o infografía para LinkedIn.
---

# Nuevo carrusel LinkedIn

## Pasos

1. Leer `AGENTS.md` y el schema en `lib/schemas/carousel.ts`.
2. Pedir o inferir: tema, audiencia, ángulo (curiosidad / dato / proceso).
3. Elegir BrandKit/preset si el usuario pide look (Light Infographic, Bold Compare, Tech Blue, Wireframe).
4. Proponer `CarouselContent` válido (Zod): `hook` → slides de valor → `cta`.
   - Preferir plantillas modernas: `vs-split`, `ribbon-steps`, `icon-rows`, `icon-bento`.
   - Incluir `icon` del catálogo SVG cuando el schema lo permita.
   - Campo `layout` (x/y/w/h, fontSize, bold, italic por slot): **omitir por defecto**. Solo añadirlo si el usuario pide composición/posición custom.
5. Crear/actualizar post vía studio o API (`POST /api/posts` o `PATCH /api/posts/:id`).
6. Si el usuario pide PDF: guardar versión, asegurar `pnpm dev`, llamar `POST /api/export` con `versionId`.
7. Entregar: título, nº de slides, path/descarga del PDF.

## Checklist de calidad

- [ ] Poco texto; 1 idea/slide
- [ ] Primera slide genera curiosidad
- [ ] Números/comparativas legibles
- [ ] Iconos del catálogo (no emojis inventados)
- [ ] Cierre con pregunta o CTA claro
- [ ] Sin inventar templates fuera del catálogo

Si hace falta una plantilla que no existe, usar `.cursor/skills/nueva-plantilla/SKILL.md`.
