import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import type { Project } from "@/types";

export function ProjectCard({ project: p }: { project: Project }) {
    const nearlyDone = p.progress_percent >= 90; // ganti gaya jadi "emas" saat hampir selesai

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-container-lowest shadow-glow transition-all hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden bg-surface-container-high">
                {p.image_urls?.[0] ? (
                    <Image
                        src={p.image_urls[0]}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw"
                        priority />
                ) : (
                    <div className="flex h-full items-center justify-center text-on-surface-variant">
                        <Icon name="image" className="text-4xl opacity-40" />
                    </div>
                )}
                {p.program?.name && (
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-label-sm text-primary backdrop-blur-sm">
                        {p.program.name}
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col space-y-4 p-6">
                <h3 className="text-headline-md leading-snug text-primary">{p.name}</h3>
                <p className="line-clamp-2 text-body-md text-on-surface-variant">{p.description}</p>

                <div className="mt-auto space-y-2">
                    <div className="flex items-end justify-between">
                        <span className={`text-label-md ${nearlyDone ? "text-secondary" : "text-primary"}`}>
                            {formatRupiah(p.amount_raised)}{" "}
                            <span className="text-xs font-normal text-on-surface-variant">
                                dari {formatRupiah(p.target_amount)}
                            </span>
                        </span>
                        <span className={`text-label-sm font-bold ${nearlyDone ? "text-secondary" : "text-primary"}`}>
                            {Math.round(p.progress_percent)}%
                        </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                        <div
                            className={`h-full rounded-full ${nearlyDone ? "bg-secondary" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, p.progress_percent)}%` }}
                        />
                    </div>
                </div>

                <Link
                    href={`/project/${p.slug}`}
                    className={`mt-2 block w-full rounded-xl py-3 text-center text-label-md transition-all ${nearlyDone
                        ? "bg-secondary text-on-secondary hover:opacity-90"
                        : "bg-primary text-on-primary hover:bg-deep-forest"
                        }`}
                >
                    {nearlyDone ? "Selesaikan Wakaf" : "Wakaf Sekarang"}
                </Link>
            </div>
        </article>
    );
}