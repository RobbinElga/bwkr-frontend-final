import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    if (testimonials.length === 0) return null;

    return (
        <section className="py-20">
            <Container>
                <h2 className="mb-16 text-center text-headline-lg text-primary">Kata Mereka</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <figure
                            key={t.id}
                            className="rounded-2xl border border-border-subtle bg-surface-container-lowest p-8 shadow-glow"
                        >
                            <div className="mb-6 flex gap-1 text-secondary">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Icon key={i} name="star" filled />
                                ))}
                            </div>
                            <blockquote className="mb-8 text-body-md italic text-on-surface-variant">
                                “{t.content}”
                            </blockquote>
                            <figcaption className="flex items-center gap-4">
                                <div className="h-12 w-12 overflow-hidden rounded-full bg-surface-dim">
                                    {t.photo_url ? (
                                        <Image src={t.photo_url} alt={t.name} width={48} height={48} className="h-full w-full object-cover" priority />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center font-bold text-on-surface-variant">
                                            {t.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-label-md text-on-surface">{t.name}</p>
                                    {t.title && <p className="text-label-sm text-on-surface-variant">{t.title}</p>}
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </Container>
        </section>
    );
}