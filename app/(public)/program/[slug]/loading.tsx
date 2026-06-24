import { Container } from "@/components/layout/Container";
import { Skeleton, ProgramCardSkeleton } from "@/components/ui/Skeleton";

export default function ProgramDetailLoading() {
    return (
        <main className="pb-20 pt-28">
            {/* Hero */}
            <div className="bg-deep-forest py-16">
                <Container>
                    <div className="mx-auto max-w-3xl space-y-4 text-center">
                        <Skeleton className="mx-auto h-6 w-24 rounded-full bg-white/20" />
                        <Skeleton className="mx-auto h-12 w-3/4 bg-white/20" />
                        <Skeleton className="mx-auto h-5 w-full bg-white/20" />
                        <Skeleton className="mx-auto h-5 w-4/5 bg-white/20" />
                        <div className="mt-6 flex justify-center gap-4">
                            <Skeleton className="h-12 w-36 rounded-xl bg-white/20" />
                            <Skeleton className="h-12 w-36 rounded-xl bg-white/20" />
                        </div>
                    </div>
                </Container>
            </div>

            {/* Stats */}
            <div className="border-b border-border-subtle bg-surface-container-lowest py-8">
                <Container>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-2 text-center">
                                <Skeleton className="mx-auto h-8 w-28" />
                                <Skeleton className="mx-auto h-4 w-20" />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Proyek */}
            <Container className="py-16">
                <Skeleton className="mb-8 h-8 w-48" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)}
                </div>
            </Container>
        </main>
    );
}