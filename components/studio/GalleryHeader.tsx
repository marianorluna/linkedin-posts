"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { HamburgerButton } from "@/components/ui/HamburgerButton";
import type { PostOriginFilter } from "@/lib/domain/post";

const FILTERS: { id: PostOriginFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "template", label: "Plantillas" },
  { id: "user", label: "Míos" },
];

function hrefFor(filter: PostOriginFilter, page: number) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/?${q}` : "/";
}

type GalleryHeaderProps = {
  filter: PostOriginFilter;
  total: number;
  pageSize: number;
};

export function GalleryHeader({ filter, total, pageSize }: GalleryHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerId = useId();

  return (
    <>
      <header className="flex shrink-0 items-center justify-between gap-3 pb-3">
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase">
            Studio LinkedIn
          </p>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-[family-name:var(--font-display)] text-2xl tracking-tight md:text-3xl">
              Carruseles
            </h1>
            <p className="text-xs text-[var(--muted)] md:text-sm">
              {total} en total · {pageSize}/página
            </p>
          </div>
        </div>

        <div className="hidden flex-wrap items-center gap-2 md:flex">
          <FilterNav filter={filter} />
          <Link
            href="/posts/new"
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[#0b1015] transition hover:brightness-110"
          >
            Nuevo carrusel
          </Link>
        </div>

        <HamburgerButton
          open={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          controls={drawerId}
          labelOpen="Abrir menú"
          labelClose="Cerrar menú"
          className="md:hidden"
        />
      </header>

      <Drawer
        id={drawerId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        side="right"
        title="Menú"
        widthClassName="w-[min(100vw-2.5rem,18rem)]"
      >
        <div className="flex flex-col gap-4 p-4">
          <nav aria-label="Filtrar por origen" className="flex flex-col gap-2">
            {FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <Link
                  key={item.id}
                  href={hrefFor(item.id, 1)}
                  onClick={() => setMenuOpen(false)}
                  className={`inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--accent)] text-[#0b1015]"
                      : "bg-white/5 text-[var(--muted)] hover:bg-white/10 hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/posts/new"
            onClick={() => setMenuOpen(false)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--accent)] px-4 text-sm font-medium text-[#0b1015] transition hover:brightness-110"
          >
            Nuevo carrusel
          </Link>
        </div>
      </Drawer>
    </>
  );
}

function FilterNav({ filter }: { filter: PostOriginFilter }) {
  return (
    <nav
      className="flex rounded-full border border-[var(--panel-border)] bg-[var(--panel)] p-0.5"
      aria-label="Filtrar por origen"
    >
      {FILTERS.map((item) => {
        const active = filter === item.id;
        return (
          <Link
            key={item.id}
            href={hrefFor(item.id, 1)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-[var(--accent)] text-[#0b1015]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
