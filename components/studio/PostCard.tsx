"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useConfirm } from "@/components/ui/ConfirmDialog";
import type { PostOrigin } from "@/lib/domain/post";

export type PostCardData = {
  id: string;
  title: string;
  topic: string;
  tags: string[];
  status: string;
  origin?: PostOrigin;
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
  const [action, setAction] = useState<"duplicate" | "delete" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDuplicate() {
    setError(null);
    setAction("duplicate");
    try {
      const response = await fetch(`/api/posts/${post.id}/duplicate`, { method: "POST" });
      const body = (await response.json().catch(() => null)) as
        | { error?: string; post?: { id?: string } }
        | null;
      if (!response.ok) {
        throw new Error(body?.error ?? "No se pudo duplicar");
      }
      startTransition(() => {
        if (body?.post?.id) {
          router.push(`/posts/${body.post.id}`);
        } else {
          router.refresh();
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al duplicar");
      setAction(null);
    }
  }

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
    setAction("delete");
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
      setAction(null);
    }
  }

  const visibleTags = post.tags.slice(0, 2);
  const extraTags = post.tags.length - visibleTags.length;

  return (
    <article className="flex h-full min-h-0 flex-col rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] p-3 transition hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]">
      <div className="flex items-start justify-between gap-2">
        <h2 className="line-clamp-1 min-w-0 font-[family-name:var(--font-display)] text-sm leading-snug tracking-tight">
          <Link href={`/posts/${post.id}`} className="hover:text-[var(--accent)]">
            {post.title}
          </Link>
        </h2>
        <span className="shrink-0 rounded-full border border-[var(--panel-border)] px-2 py-0.5 text-[10px] text-[var(--muted)]">
          {post.origin === "template" ? "plantilla" : post.status}
        </span>
      </div>

      <p className="mt-1 line-clamp-1 text-xs text-[var(--muted)]">{post.topic}</p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-[var(--muted)]">
        <span>
          {post.slideCount} slides · {post.versionCount}v
        </span>
        {visibleTags.map((tag) => (
          <span key={tag} className="rounded bg-white/5 px-1.5 py-0.5 text-[var(--accent)]">
            #{tag}
          </span>
        ))}
        {extraTags > 0 ? <span>+{extraTags}</span> : null}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2.5">
        <Link
          href={`/posts/${post.id}`}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--panel-border)] px-2 py-1 text-[11px] font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <EditIcon />
          Editar
        </Link>
        <button
          type="button"
          onClick={handleDuplicate}
          disabled={isPending || action !== null}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--panel-border)] px-2 py-1 text-[11px] font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50"
        >
          <DuplicateIcon />
          {action === "duplicate" ? "…" : "Duplicar"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending || action !== null}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--panel-border)] px-2 py-1 text-[11px] font-medium text-[var(--muted)] transition hover:border-red-400/50 hover:text-red-300 disabled:opacity-50"
        >
          <TrashIcon />
          {action === "delete" ? "…" : "Eliminar"}
        </button>
        {error ? <span className="basis-full text-[10px] text-red-300">{error}</span> : null}
      </div>
    </article>
  );
}

function EditIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function DuplicateIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 9h10v12H9zM5 3h10v4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7v12h4"
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
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
