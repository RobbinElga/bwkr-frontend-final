import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { formatDate, readingTime } from "@/lib/format";
import type { NewsItem } from "@/types";

export function NewsSection({ news }: { news: NewsItem[] }) {
    if (news.length === 0) return null;
    const items = news.slice(0, 3);

    return (
        <section id="berita" className="bg-surface-gray py-20">
            <Container>
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-headline-lg text-primary">Berita &amp; Artikel</h2>
                        <p className="mt-4 text-body-md text-on-surface-variant">
                            Informasi terbaru seputar dunia filantropi dan edukasi wakaf.
                        </p>
                    </div>
                    <Link href="/berita" className="hidden items-center gap-2 text-label-md text-primary hover:underline md:flex">
                        Lihat Semua Artikel <Icon name="chevron_right" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {items.map((n) => (
                        <article key={n.id} className="group">
                            <Link href={`/berita/${n.slug}`}>
                                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container-high">
                                    {n.featured_image_url ? (
                                        <Image
                                            src={n.featured_image_url}
                                            alt={n.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width:768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-on-surface-variant">
                                            <Icon name="article" className="text-4xl opacity-40" />
                                        </div>
                                    )}
                                    {n.category && (
                                        <div className="absolute left-4 top-4 rounded-md bg-primary-container px-3 py-1 text-label-sm text-on-primary-container">
                                            {n.category}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3 flex items-center gap-3 text-label-sm text-on-surface-variant">
                                    <span>{formatDate(n.published_at)}</span>
                                    <span className="h-1 w-1 rounded-full bg-outline-variant" />
                                    <span>{readingTime(n.content)} Menit Baca</span>
                                </div>
                                <h3 className="mb-3 text-headline-md text-on-surface transition-colors group-hover:text-primary">
                                    {n.title}
                                </h3>
                                {n.meta_desc && (
                                    <p className="line-clamp-2 text-body-md text-on-surface-variant">{n.meta_desc}</p>
                                )}
                            </Link>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}