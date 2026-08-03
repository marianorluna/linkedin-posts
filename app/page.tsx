import Link from "next/link";
import { GalleryHeader } from "@/components/studio/GalleryHeader";
import { PostCard } from "@/components/studio/PostCard";
import { HOME_PAGE_SIZE, parseOriginFilter, type PostOriginFilter } from "@/lib/domain/post";
import { listPostsPage } from "@/lib/domain/post-service";

export const dynamic = "force-dynamic";

function hrefFor(filter: PostOriginFilter, page: number) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/?${q}` : "/";
}

type PageProps = {
  searchParams: Promise<{ filter?: string; page?: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filter = parseOriginFilter(params.filter);
  const pageRaw = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  const result = await listPostsPage({
    origin: filter,
    page,
    pageSize: HOME_PAGE_SIZE,
  });

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden px-4 pt-[max(1rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] md:px-6">
      <GalleryHeader filter={filter} total={result.total} pageSize={HOME_PAGE_SIZE} />

      {result.total === 0 ? (
        <div className="flex min-h-0 flex-1 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] p-8 text-sm text-[var(--muted)]">
          {filter === "user" ? (
            <span>Aún no tienes carruseles propios. Duplica una plantilla o crea uno nuevo.</span>
          ) : filter === "template" ? (
            <span>
              No hay plantillas. Ejecuta <code className="text-[var(--accent)]">pnpm db:seed</code>.
            </span>
          ) : (
            <span>
              No hay posts. Crea el primero o ejecuta{" "}
              <code className="text-[var(--accent)]">pnpm db:seed</code>.
            </span>
          )}
        </div>
      ) : (
        <ul className="studio-scroll grid min-h-0 flex-1 auto-rows-max grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {result.items.map((post) => (
            <li key={post.id} className="min-h-0">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}

      <footer className="flex shrink-0 items-center justify-between gap-3 pt-3 text-xs text-[var(--muted)]">
        <span>
          Página {result.page} de {result.totalPages}
        </span>
        <div className="flex items-center gap-2">
          {result.page > 1 ? (
            <Link
              href={hrefFor(filter, result.page - 1)}
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--panel-border)] px-3 py-1.5 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Anterior
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-full border border-transparent px-3 py-1.5 opacity-40">
              Anterior
            </span>
          )}
          {result.page < result.totalPages ? (
            <Link
              href={hrefFor(filter, result.page + 1)}
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--panel-border)] px-3 py-1.5 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Siguiente
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-full border border-transparent px-3 py-1.5 opacity-40">
              Siguiente
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
