import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectDetailLoading() {
    return (
        <main className="pb-20 pt-28">
            <Container>
                <Skeleton className="mb-6 h-5 w-32" />
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Kiri */}
                    <div className="space-y-8 lg:col-span-2">
                        <Skeleton className="aspect-[16/10] w-full rounded-3xl" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-3/4" />
                        </div>
                        {/* Tab bar */}
                        <div className="flex gap-6 border-b border-border-subtle pb-4">
                            {["Tentang", "Update", "Donatur"].map((t) => (
                                <Skeleton key={t} className="h-5 w-16" />
                            ))}
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    </div>
                    {/* Kanan: kartu donasi */}
                    <aside>
                        <div className="space-y-5 rounded-3xl border border-border-subtle p-6 custom-shadow">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-8 w-40" />
                            <Skeleton className="h-4 w-32" />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <Skeleton className="h-3 w-full rounded-full" />
                            </div>
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                    </aside>
                </div>
            </Container>
        </main>
    );
}