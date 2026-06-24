"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
const LIKED_KEY = "bwkr_liked_news";
const SAVED_KEY = "bwkr_saved_news";

function readList(key: string): string[] {
    try { return JSON.parse(localStorage.getItem(key) ?? "[]"); } catch { return []; }
}
function writeList(key: string, list: string[]) {
    localStorage.setItem(key, JSON.stringify(list));
}

export function ArticleActions({ slug, title, initialLikes = 0, variant = "full" }: {
    slug: string;
    title: string;
    initialLikes?: number;
    variant?: "full" | "compact";
}) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const [saved, setSaved] = useState(false);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        setLiked(readList(LIKED_KEY).includes(slug));
        setSaved(readList(SAVED_KEY).includes(slug));
    }, [slug]);

    async function toggleLike() {
        if (busy) return;
        setBusy(true);
        const next = !liked;
        setLiked(next);
        setLikes((n) => Math.max(0, n + (next ? 1 : -1))); // optimistic
        try {
            const res = await fetch(`${API}/news/${slug}/${next ? "like" : "unlike"}`, {
                method: "POST",
                headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error();
            const body = await res.json().catch(() => null);
            if (body && typeof body.likes_count === "number") setLikes(body.likes_count);
            const list = readList(LIKED_KEY);
            writeList(LIKED_KEY, next ? [...new Set([...list, slug])] : list.filter((s) => s !== slug));
        } catch {
            setLiked(!next); // revert
            setLikes((n) => Math.max(0, n + (next ? -1 : 1)));
        } finally {
            setBusy(false);
        }
    }

    function toggleSave() {
        const next = !saved;
        setSaved(next);
        const list = readList(SAVED_KEY);
        writeList(SAVED_KEY, next ? [...new Set([...list, slug])] : list.filter((s) => s !== slug));
    }

    async function share() {
        const url = typeof window !== "undefined" ? window.location.href : "";
        if (navigator.share) {
            try { await navigator.share({ title, url }); } catch { /* dibatalkan user */ }
            return;
        }
        try {
            await navigator.clipboard.writeText(url);
            alert("Link artikel disalin ke clipboard.");
        } catch {
            alert(url);
        }
    }

    if (variant === "compact") {
        return (
            <div className="flex items-center gap-3">
                <button onClick={share} aria-label="Bagikan"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-primary transition-colors hover:bg-primary-fixed">
                    <Icon name="share" />
                </button>
                <button onClick={toggleSave} aria-label="Simpan"
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle transition-colors hover:bg-primary-fixed ${saved ? "bg-primary text-on-primary" : "text-primary"}`}>
                    <Icon name={saved ? "bookmark" : "bookmark_border"} />
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-3">
            <button onClick={toggleLike} disabled={busy}
                className={`flex items-center gap-2 text-label-md text-primary transition-opacity hover:opacity-70 ${liked ? "font-bold" : ""}`}>
                <Icon name={liked ? "thumb_up" : "thumb_up_off_alt"} /> Bermanfaat{likes > 0 ? ` (${likes})` : ""}
            </button>
            <button onClick={share}
                className="flex items-center gap-2 text-label-md text-primary transition-opacity hover:opacity-70">
                <Icon name="send" /> Bagikan
            </button>
        </div>
    );
}