import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function TentangLoading() {
    return (
        <main className="pb-20 pt-28">
            <Container>
                <div className="mx-auto max-w-3xl space-y-8">
                    <div className="space-y-4 text-center">
                        <Skeleton className="mx-auto h-10 w-64" />
                        <Skeleton className="mx-auto h-5 w-full" />
                        <Skeleton className="mx-auto h-5 w-4/5" />
                    </div>
                    <Skeleton className="aspect-video w-full rounded-2xl" />
                    <div className="space-y-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? "w-3/4" : "w-full"}`} />
                        ))}
                    </div>
                </div>
            </Container>
        </main>
    );
}