"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import type { ImpactVideo } from "@/types";

function thumb(id: string | null) {
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

function PlayOverlay({ big = false }: { big?: boolean }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/20">
            <div
                className={`flex items-center justify-center rounded-full border border-white/40 bg-white/30 backdrop-blur-md transition-transform group-hover:scale-110 ${big ? "h-20 w-20" : "h-14 w-14"
                    }`}
            >
                <Icon name="play_arrow" filled className={big ? "text-4xl text-white" : "text-2xl text-white"} />
            </div>
        </div>
    );
}

export function DampakSection({ videos }: { videos: ImpactVideo[] }) {
    const [active, setActive] = useState<ImpactVideo | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    if (videos.length === 0) return null;

    const [featured, ...rest] = videos;

    return (
        <section id="dampak" className="py-20">
            <Container>
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="text-headline-lg text-primary">Dampak yang Dirasakan</h2>
                    <p className="mt-4 text-body-md text-on-surface-variant">
                        Saksikan langsung bagaimana setiap rupiah yang Anda wakafkan mengubah kehidupan ribuan orang di penjuru Nusantara.
                    </p>
                </div>

                {/* Video utama */}
                <button
                    onClick={() => setActive(featured)}
                    className="group relative mb-6 block aspect-video w-full overflow-hidden rounded-3xl bg-surface-container-highest shadow-xl"
                >
                    {thumb(featured.youtube_id) && (
                        <Image src={thumb(featured.youtube_id)!} alt={featured.caption ?? "Video dampak"} fill className="object-cover" sizes="100vw" priority />
                    )}
                    <PlayOverlay big />
                    {featured.caption && (
                        <div className="absolute bottom-6 left-6 text-left text-white">
                            <p className="mb-1 text-label-md opacity-80">Cerita Penerima Manfaat</p>
                            <h3 className="text-headline-md">{featured.caption}</h3>
                        </div>
                    )}
                </button>

                {/* Video lainnya */}
                {rest.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {rest.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setActive(v)}
                                className="group relative block aspect-video overflow-hidden rounded-3xl bg-surface-container-highest shadow-lg"
                            >
                                {thumb(v.youtube_id) && (
                                    <Image src={thumb(v.youtube_id)!} alt={v.caption ?? "Video dampak"} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" priority />
                                )}
                                <PlayOverlay />
                                {v.caption && (
                                    <div className="absolute bottom-4 left-4 text-left text-white">
                                        <h4 className="text-label-md">{v.caption}</h4>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </Container>

            {/* Modal pemutar video */}
            {active && active.youtube_id && (
                <div
                    onClick={() => setActive(null)}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                >
                    <div onClick={(e) => e.stopPropagation()} className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black">
                        <button onClick={() => setActive(null)} className="absolute -top-10 right-0 text-white" aria-label="Tutup">
                            <Icon name="close" className="text-3xl" />
                        </button>
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube-nocookie.com/embed/${active.youtube_id}?autoplay=1`}
                            title={active.caption ?? "Video"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
}