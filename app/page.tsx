import Link from "next/link";
import { PostCard } from "@/components/studio/PostCard";
import { listPosts } from "@/lib/domain/post-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await listPosts();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[var(--accent)] uppercase">
            Studio LinkedIn
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
            Carruseles
          </h1>
          <p className="mt-2 max-w-xl text-[var(--muted)]">
            Plantillas fijas, contenido editable, export PDF 1080×1080 listo para documento LinkedIn.
          </p>
        </div>
        <Link
          href="/posts/new"
          className="rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-[#0b1015] transition hover:brightness-110"
        >
          Nuevo carrusel
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] p-10 text-[var(--muted)]">
          No hay posts todavía. Crea el primero o ejecuta <code className="text-[var(--accent)]">pnpm db:seed</code>.
        </div>
      ) : (
        <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.id} className="h-full">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
