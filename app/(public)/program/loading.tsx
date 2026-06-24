import { Container } from "@/components/layout/Container";
import { ProgramCardSkeleton } from "@/components/ui/Skeleton";

export default function ProgramLoading() {
    return (
        <main className="pb-20 pt-28">
            <Container>
                <div className="mb-12 space-y-3">
                    <div className="h-10 w-48 animate-pulse rounded-lg bg-surface-container-high" />
                    <div className="h-5 w-72 animate-pulse rounded-lg bg-surface-container-high" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => <ProgramCardSkeleton key={i} />)}
                </div>
            </Container>
        </main>
    );
}