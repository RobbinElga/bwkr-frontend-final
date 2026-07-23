import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { getNewsBySlug, getNews } from "@/services/public";
import { formatDate, readingTime } from "@/lib/format";
import { ArticleActions } from "@/components/berita/ArticleActions";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const n = await getNewsBySlug(slug);
    if (!n) return { title: "Artikel tidak ditemukan | BWKR" };
    return {
        title: `${n.title} | BWKR`,
        description: n.meta_desc ?? undefined,
        openGraph: {
            title: n.title,
            description: n.meta_desc ?? undefined,
            type: "article",
            images: n.featured_image_url ? [n.featured_image_url] : undefined,
        },
    };
}

export default async function BeritaDetailPage({ params }: Props) {
    const { slug } = await params;
    const [article, allNews] = await Promise.all([
        getNewsBySlug(slug),
        getNews(),
    ]);
    if (!article) notFound();

    const related = allNews
        .filter((n) => n.slug !== slug && n.status === "published")
        .slice(0, 3);

    const minsRead = readingTime(article.content);

    return (
        <main className="pb-20 pt-32">
            <div className="mx-auto max-w-container-max px-4 md:px-8">

                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-on-surface-variant">
                    <Link href="/" className="text-label-md transition-colors hover:text-primary">Beranda</Link>
                    <Icon name="chevron_right" className="text-[16px]" />
                    <Link href="/berita" className="text-label-md transition-colors hover:text-primary">Berita</Link>
                    <Icon name="chevron_right" className="text-[16px]" />
                    <span className="max-w-xs truncate text-label-md font-bold text-primary">{article.title}</span>
                </nav>

                {/* Article: center column */}
                <article className="mx-auto max-w-3xl">
                    {/* Header */}
                    <header className="mb-10">
                        {article.category && (
                            <span className="mb-4 inline-block rounded-md bg-primary-container px-3 py-1 text-label-sm text-on-primary-container">
                                {article.category}
                            </span>
                        )}
                        <h1 className="mb-4 text-display-lg-mobile leading-tight text-primary md:text-display-lg">
                            {article.title}
                        </h1>
                        {article.meta_desc && (
                            <p className="mb-8 text-body-lg leading-relaxed text-on-surface-variant">
                                {article.meta_desc}
                            </p>
                        )}

                        {/* Meta + share */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border-subtle py-6">
                            <div className="flex items-center gap-4">
                                {/* Avatar inisial author */}
                                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary-fixed ring-2 ring-primary/10">
                                    <span className="text-label-md font-bold text-on-primary-fixed">
                                        {article.author?.charAt(0).toUpperCase() ?? "B"}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-label-md text-on-surface">{article.author ?? "Tim BWKR"}</p>
                                    <p className="text-label-sm text-on-surface-variant">
                                        {formatDate(article.published_at)} · {minsRead} menit baca
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="mr-1 flex items-center gap-1 text-label-sm text-on-surface-variant">
                                    <Icon name="schedule" className="text-[16px]" /> {minsRead} mnt
                                </span>
                                <ArticleActions slug={article.slug} title={article.title} variant="compact" />
                            </div>
                        </div>

                    </header>

                    {/* Hero image */}
                    {article.featured_image_url && (
                        <figure className="mb-12 overflow-hidden rounded-xl custom-shadow">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={article.featured_image_url}
                                    alt={article.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width:768px) 100vw, 768px"
                                />
                            </div>
                            {article.meta_desc && (
                                <figcaption className="bg-surface-container-low p-4 text-label-sm italic text-on-surface-variant">
                                    {article.meta_desc}
                                </figcaption>
                            )}
                        </figure>
                    )}

                    {/* Konten artikel */}
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
                    />

                    {/* Tags + aksi bawah */}
                    <div className="mt-12 flex items-center justify-between rounded-xl bg-surface-container p-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-label-md text-on-surface-variant">Tags:</span>
                            {(article.tags?.length ? article.tags : [article.category]).filter(Boolean).map((t) => (
                                <span key={t} className="rounded-full bg-surface-container-highest px-3 py-1 text-label-sm text-primary">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <ArticleActions
                                slug={article.slug}
                                title={article.title}
                                initialLikes={article.likes_count ?? 0}
                                variant="full"
                            />
                        </div>
                    </div>
                </article>

                {/* Related articles */}
                {related.length > 0 && (
                    <section className="mx-auto mt-20 max-w-5xl">
                        <h2 className="mb-8 text-headline-lg text-primary">Artikel Terkait</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {related.map((n) => (
                                <Link
                                    key={n.id}
                                    href={`/berita/${n.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-border-subtle bg-surface-container-lowest custom-shadow transition-transform hover:-translate-y-1"
                                >
                                    <div className="relative h-48 overflow-hidden bg-surface-container-high">
                                        {n.featured_image_url ? (
                                            <Image
                                                src={n.featured_image_url}
                                                alt={n.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width:768px) 100vw, 33vw"
                                                priority />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-on-surface-variant">
                                                <Icon name="article" className="text-4xl opacity-40" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        {n.category && (
                                            <span className="mb-2 inline-block text-label-sm uppercase tracking-wider text-secondary">
                                                {n.category}
                                            </span>
                                        )}
                                        <h3 className="mb-3 text-headline-md text-on-surface transition-colors group-hover:text-primary">
                                            {n.title}
                                        </h3>
                                        {n.meta_desc && (
                                            <p className="line-clamp-2 text-label-md text-on-surface-variant">{n.meta_desc}</p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}