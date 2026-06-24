import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CekStatusLoading() {
    return (
        <main className="pb-20 pt-28">
            <Container>
                <div className="mx-auto max-w-lg space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-9 w-40" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow space-y-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                </div>
            </Container>
        </main>
    );
}