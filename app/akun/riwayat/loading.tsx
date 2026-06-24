import { Skeleton } from "@/components/ui/Skeleton";

export default function RiwayatLoading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:col-span-2 md:p-8 space-y-2">
                    <Skeleton className="h-9 w-40" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-primary/20 bg-primary/5 p-6 custom-shadow space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-7 w-40" />
                    </div>
                    <Skeleton className="h-4 w-28" />
                </div>
            </div>

            {/* Daftar donasi */}
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-border-subtle bg-surface-container-lowest p-5 custom-shadow md:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-4">
                                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-28 rounded-full" />
                        </div>
                        <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-border-subtle pt-4">
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-5 w-28" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                            <Skeleton className="ml-auto h-9 w-28 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}