import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Program } from "@/types";

export function ProgramCard({ program: p }: { program: Program }) {
    return (
        <Link
            href={`/program/${p.slug}`}
            className="group block overflow-hidden rounded-xl border border-border-subtle bg-surface-container-low shadow-glow transition-all hover:-translate-y-2"
        >
            <div className="relative h-48 overflow-hidden bg-surface-container-high">
                {p.image_url ? (
                    <Image
                        src={p.image_url}
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
            </div>
            <div className="p-6">
                <h3 className="mb-2 text-headline-md text-on-surface transition-colors group-hover:text-primary">
                    {p.name}
                </h3>
                <p className="line-clamp-2 text-body-md text-on-surface-variant">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-label-md text-primary">
                    Lihat Project
                    <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}