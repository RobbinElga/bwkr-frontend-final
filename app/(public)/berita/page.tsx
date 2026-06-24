import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { getNews } from "@/services/public";
import { formatDate, readingTime } from "@/lib/format";

export const metadata: Metadata = {
    title: "Berita & Artikel | BWKR",
    description: "Kabar terbaru, edukasi wakaf, dan laporan dampak dari BWKR.",
};

export default async function BeritaPage() {
    const news = await getNews();

    return (
        <main className="pb-20 pt-28">
            <Container>
                <header className="mb-12 max-w-2xl">
                    <h1 className="text-display-lg-mobile text-primary">Berita &amp; Artikel</h1>
                    <p className="mt-4 text-body-md text-on-surface-variant">
                        Kabar terbaru, edukasi wakaf, dan laporan dampak dari BWKR.
                    </p>
                </header>

                {news.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border-subtle p-8 text-center text-on-surface-variant">
                        Belum ada artikel.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {news.map((n) => (
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
                                    <h2 className="mb-3 text-headline-md text-on-surface transition-colors group-hover:text-primary">
                                        {n.title}
                                    </h2>
                                    {n.meta_desc && (
                                        <p className="line-clamp-2 text-body-md text-on-surface-variant">{n.meta_desc}</p>
                                    )}
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}