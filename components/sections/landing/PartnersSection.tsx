import Image from "next/image";
import { Container } from "@/components/layout/Container";
import type { Partner } from "@/types";

export function PartnersSection({ partners }: { partners: Partner[] }) {
    if (partners.length === 0) return null;

    // gandakan daftar agar loop-nya mulus (tak ada celah saat reset)
    const loop = [...partners, ...partners];

    return (
        <section className="border-y border-border-subtle bg-white py-16">
            <Container className="text-center">
                <p className="mb-10 text-label-sm uppercase tracking-widest text-on-surface-variant">
                    Telah Dipercaya Oleh
                </p>
            </Container>

            <div
                className="relative overflow-hidden"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
            >
                <div className="bwkr-marquee-track gap-12 md:gap-20">
                    {loop.map((p, i) => (
                        <div
                            key={`${p.id}-${i}`}
                            aria-hidden={i >= partners.length}
                            className="flex shrink-0 items-center opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                        >
                            {p.logo_url ? (
                                <Image
                                    src={p.logo_url}
                                    alt={p.name}
                                    width={120}
                                    height={40}
                                    className="h-8 w-auto object-contain md:h-10"
                                    priority
                                />
                            ) : (
                                <span className="whitespace-nowrap text-label-md text-on-surface-variant">{p.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}