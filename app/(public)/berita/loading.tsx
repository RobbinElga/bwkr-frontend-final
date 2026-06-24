import { Container } from "@/components/layout/Container";
import { NewsCardSkeleton } from "@/components/ui/Skeleton";

export default function BeritaLoading() {
    return (
        <main className="pb-20 pt-28">
            <Container>
                <div className="mb-12 space-y-3">
                    <div className="h-10 w-52 animate-pulse rounded-lg bg-surface-container-high" />
                    <div className="h-5 w-80 animate-pulse rounded-lg bg-surface-container-high" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)}
                </div>
            </Container>
        </main>
    );
}