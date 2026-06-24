import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DonasiLoading() {
    return (
        <main className="pb-20 pt-28">
            <Container>
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    {/* Form kiri */}
                    <div className="lg:col-span-7">
                        <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                            <div className="mb-6 space-y-2">
                                <Skeleton className="h-9 w-40" />
                                <Skeleton className="h-4 w-72" />
                            </div>
                            {/* Step bar */}
                            <div className="mb-6 flex gap-2">
                                <Skeleton className="h-1.5 flex-1 rounded-full" />
                                <Skeleton className="h-1.5 flex-1 rounded-full" />
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <div className="grid grid-cols-4 gap-3">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <Skeleton key={i} className="h-12 rounded-lg" />
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                </div>
                                <Skeleton className="mt-4 h-14 w-full rounded-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Impact card kanan */}
                    <div className="lg:col-span-5">
                        <div className="overflow-hidden rounded-xl bg-primary p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32 bg-white/20" />
                                    <Skeleton className="h-3 w-44 bg-white/20" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Skeleton className="h-20 w-full rounded-lg bg-white/10" />
                                <Skeleton className="h-24 w-full rounded-lg bg-white/10" />
                            </div>
                            <div className="mt-8 border-t border-white/10 pt-6 space-y-2">
                                <Skeleton className="h-4 w-full bg-white/10" />
                                <Skeleton className="h-4 w-5/6 bg-white/10" />
                                <Skeleton className="h-4 w-4/5 bg-white/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}