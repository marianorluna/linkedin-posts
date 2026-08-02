---
name: nuevo-carrusel
description: Crear o iterar un carrusel LinkedIn (brief → JSON → plantillas → preview → PDF). Úsalo cuando el usuario pida un post, carrusel, diapositivas o infografía para LinkedIn.
---

# Nuevo carrusel LinkedIn

## Pasos

1. Leer `AGENTS.md` y el schema en `lib/schemas/carousel.ts`.
2. Pedir o inferir: tema, audiencia, ángulo (curiosidad / dato / proceso).
3. Proponer `CarouselContent` válido (Zod): `hook` → slides de valor → `cta`.
4. Crear/actualizar post vía studio o API (`POST /api/posts` o `PATCH /api/posts/:id`).
5. Si el usuario pide PDF: guardar versión, asegurar `pnpm dev`, llamar `POST /api/export` con `versionId`.
6. Entregar: título, nº de slides, path/descarga del PDF.

## Checklist de calidad

- [ ] Poco texto; 1 idea/slide
- [ ] Primera slide genera curiosidad
- [ ] Números/comparativas legibles
- [ ] Cierre con pregunta o CTA claro
- [ ] Sin inventar templates fuera del catálogo
