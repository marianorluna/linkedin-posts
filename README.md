# Studio Infografías LinkedIn

Genera carruseles LinkedIn como diapositivas React **1080×1080** con estilo UI/wireframe propio, edita el contenido en JSON tipado y exporta un **PDF multipágina** listo para subir como documento.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Prisma + SQLite (local)
- Zod (contrato de contenido)
- Playwright + pdf-lib (export)
- LLM opcional (Anthropic u OpenAI)

## Setup

```bash
pnpm install
cp .env.example .env
pnpm db:setup
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

| Variable | Uso |
|----------|-----|
| `DATABASE_URL` | SQLite (`file:./dev.db`) |
| `NEXT_PUBLIC_APP_URL` | Base URL para Playwright (`http://localhost:3000`) |
| `ANTHROPIC_API_KEY` | Generación IA (prioridad) |
| `OPENAI_API_KEY` | Generación IA alternativa |
| `OPENAI_MODEL` / `ANTHROPIC_MODEL` | Modelo (opcional) |

Sin API key, **Generar con IA** usa un carrusel demo editable.

## Flujo LinkedIn

1. Crea o edita un carrusel en el studio.
2. Guarda una versión.
3. **Exportar PDF** (el servidor `pnpm dev` debe estar activo).
4. Descarga el PDF y súbelo a LinkedIn como documento/carrusel.

## Plantillas

`hook` · `ab-compare` · `stat-hero` · `steps` · `phone-mock` · `cta`

## Repo vs local

- **GitHub:** código, plantillas, schemas, `AGENTS.md`, `.cursor/rules`, skills.
- **Local (gitignored):** `.env`, `prisma/*.db`, `storage/exports/`.

No hace falta Coolify/Docker para el MVP: trabajas en local con Cursor y publicas el PDF a mano.

## Comandos útiles

```bash
pnpm db:generate   # Prisma client
pnpm db:push       # Sync schema SQLite
pnpm db:seed       # BrandKit + templates + post de ejemplo
pnpm lint
pnpm build
```
