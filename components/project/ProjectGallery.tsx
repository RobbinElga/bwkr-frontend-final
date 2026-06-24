"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
    const [active, setActive] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="flex aspect-[16/10] items-center justify-center rounded-3xl bg-surface-container-high text-on-surface-variant">
                <Icon name="image" className="text-5xl opacity-40" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-surface-container-high">
                <Image
                    src={images[active]}
                    alt={alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 66vw"
                />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${active === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image src={img} alt={`${alt} ${i + 1}`} fill className="object-cover" sizes="120px" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}