---
name: nuevo-carrusel
description: Crear o iterar un carrusel LinkedIn (brief → JSON → plantillas → preview → PDF). Úsalo cuando el usuario pida un post, carrusel, diapositivas o infografía para LinkedIn.
---

# Nuevo carrusel LinkedIn

## Visual Brief (obligatorio antes del JSON)

Decide en una frase: **arco + variante hero + motivo**.

1. **Tipo de argumento:** contraste | proceso | dato | checklist/mapa | mito | golpe corto.
2. **Arco** (`lib/domain/narrative-arcs.ts`): `contrast` | `number-story` | `process` | `map` | `myth-bust` | `single-punch`.
3. **Dispositivo hero** del episodio (un gesto dominante): número, split, bento, ribbons, type-dominant…
4. **`visual`:** motif (`orbs|orbs-tl|orbs-center|arcs|blocks|dots|grid|ribbons|bars|diagonal|none`) + `accentShift` + `contrast`. `none` = sin figuras de fondo.
5. **Variants** en hook/cta y slides clave (`lib/schemas/variants.ts`). No reutilizar el mismo trío arco+hero+motivo que el post anterior.

Prohibido por defecto: `hook → vs-split → ribbon-steps → cta` salvo que el argumento sea realmente contraste+proceso.

## Pasos

1. Leer `AGENTS.md` y el schema en `lib/schemas/carousel.ts`.
2. Pedir o inferir: tema, audiencia, ángulo (curiosidad / dato / proceso).
3. Completar Visual Brief (arriba).
4. Elegir BrandKit/preset si el usuario pide look (Light Infographic, Bold Compare, Tech Blue, Wireframe).
5. Proponer `CarouselContent` válido (Zod): `visual` + `hook` → slides de valor según arco → `cta`.
   - Incluir `variant` en slides con siluetas alternativas.
   - Incluir `icon` del catálogo SVG cuando el schema lo permita.
   - Campo `layout` (x/y/w/h, fontSize, bold, italic por slot): **omitir por defecto**. Solo añadirlo si el usuario pide composición/posición custom.
6. Crear/actualizar post vía studio o API (`POST /api/posts` o `PATCH /api/posts/:id`).
7. Si el usuario pide PDF: guardar versión, asegurar `pnpm dev`, llamar `POST /api/export` con `versionId`.
8. Entregar: título, arco usado, nº de slides, path/descarga del PDF.

## Checklist de calidad

- [ ] Visual Brief explícito (arco ≠ reciclaje del post anterior)
- [ ] `visual.motif` / acento coherentes con el tema
- [ ] Variants distintas en hook/cta cuando existan
- [ ] Poco texto; 1 idea/slide
- [ ] Primera slide genera curiosidad
- [ ] Números/comparativas legibles
- [ ] Iconos del catálogo (no emojis inventados)
- [ ] Cierre con pregunta o CTA claro
- [ ] Sin inventar templates fuera del catálogo

Si hace falta una plantilla que no existe, **primero** valorar una `variant` nueva; si no cabe, `.cursor/skills/nueva-plantilla/SKILL.md`.
