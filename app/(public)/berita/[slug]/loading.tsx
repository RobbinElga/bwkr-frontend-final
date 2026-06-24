import { Container } from "@/components/layout/Container";
import { Skeleton, NewsCardSkeleton } from "@/components/ui/Skeleton";

export default function BeritaDetailLoading() {
    return (
        <main className="pb-20 pt-32">
            <div className="mx-auto max-w-container-max px-4 md:px-8">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-40" />
                </div>

                <div className="mx-auto max-w-3xl space-y-8">
                    {/* Badge + judul */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-24 rounded-md" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-4/5" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-3/4" />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between border-y border-border-subtle py-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-36" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>

                    {/* Hero image */}
                    <Skeleton className="aspect-video w-full rounded-xl" />

                    {/* Konten */}
                    <div className="space-y-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className={`h-4 ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />
                        ))}
                    </div>
                </div>

                {/* Related */}
                <div className="mx-auto mt-20 max-w-5xl">
                    <Skeleton className="mb-8 h-8 w-40" />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => <NewsCardSkeleton key={i} />)}
                    </div>
                </div>
            </div>
        </main>
    );
}