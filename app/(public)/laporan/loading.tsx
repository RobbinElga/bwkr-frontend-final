import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function LaporanLoading() {
    return (
        <main className="pt-28">
            <Container>
                <div className="grid items-center gap-8 py-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/5" />
                    </div>
                </div>
            </Container>
            <div className="my-8 border-y border-border-subtle bg-surface-container-low py-6">
                <Container>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-7 w-32" />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
            <Container>
                <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="overflow-hidden rounded-xl border border-border-subtle custom-shadow">
                            <Skeleton className="h-56 w-full rounded-none" />
                            <div className="space-y-3 p-6">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="mt-4 h-11 w-full rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}