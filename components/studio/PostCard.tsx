"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useConfirm } from "@/components/ui/ConfirmDialog";

export type PostCardData = {
  id: string;
  title: string;
  topic: string;
  tags: string[];
  status: string;
  slideCount: number;
  versionCount: number;
};

type PostCardProps = {
  post: PostCardData;
};

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const confirmed = await confirm({
      title: "Eliminar carrusel",
      description: `¿Eliminar «${post.title}»? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      cancelLabel: "Cancelar",
      tone: "danger",
    });
    if (!confirmed) return;

    setError(null);
    try {
      const response = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "No se pudo eliminar");
      }
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    }
  }

  return (
    <article className="flex h-full min-h-[220px] flex-col rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 transition hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 min-h-[3.5rem] font-[family-name:var(--font-display)] text-xl leading-tight tracking-tight">
          <Link href={`/posts/${post.id}`} className="hover:text-[var(--accent)]">
            {post.title}
          </Link>
        </h2>
        <span className="shrink-0 rounded-full border border-[var(--panel-border)] px-3 py-1 text-xs text-[var(--muted)]">
          {post.status}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-[var(--muted)]">{post.topic}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
        <span>{post.slideCount} slides</span>
        <span>·</span>
        <span>{post.versionCount} versiones</span>
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[var(--accent)]">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-5">
        <Link
          href={`/posts/${post.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--panel-border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <EditIcon />
          Editar
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--panel-border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:border-red-400/50 hover:text-red-300 disabled:opacity-50"
        >
          <TrashIcon />
          {isPending ? "Eliminando…" : "Eliminar"}
        </button>
        {error ? <span className="text-xs text-red-300">{error}</span> : null}
      </div>
    </article>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
