import { Skeleton } from "@/components/ui/Skeleton";

export default function AkunLoading() {
    return (
        <div className="mx-auto flex max-w-7xl gap-8 px-4 pb-28 pt-28 md:px-8 md:pb-16">
            {/* Sidebar skeleton — desktop */}
            <aside className="hidden w-64 shrink-0 md:block">
                <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-4 custom-shadow space-y-2">
                    <Skeleton className="mb-4 h-4 w-24" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-3">
                            <Skeleton className="h-5 w-5 rounded" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    ))}
                    <div className="my-3 h-px bg-border-subtle" />
                    <div className="flex items-center gap-3 px-3 py-3">
                        <Skeleton className="h-5 w-5 rounded" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            </aside>

            {/* Konten */}
            <main className="min-w-0 flex-grow space-y-6">
                <RingkasanSkeleton />
            </main>
        </div>
    );
}

function RingkasanSkeleton() {
    return (
        <div className="space-y-6">
            {/* Sapaan */}
            <div className="space-y-2">
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Baris atas */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Kartu profil */}
                <div className="flex items-start gap-5 rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                    <Skeleton className="h-20 w-20 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-52" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-2 h-9 w-28 rounded-full" />
                    </div>
                </div>

                {/* Kartu dampak */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-28 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col justify-between gap-6 rounded-xl bg-primary-container p-6">
                            <Skeleton className="h-6 w-6 rounded bg-white/30" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20 bg-white/30" />
                                <Skeleton className="h-6 w-28 bg-white/30" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-6 rounded-xl bg-secondary-container p-6">
                            <Skeleton className="h-6 w-6 rounded bg-white/30" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20 bg-white/30" />
                                <Skeleton className="h-6 w-24 bg-white/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wakaf terbaru */}
            <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest custom-shadow">
                <div className="flex items-center justify-between border-b border-border-subtle p-6">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <ul className="divide-y divide-border-subtle">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <li key={i} className="flex items-center gap-4 p-5">
                            <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-36" />
                            </div>
                            <div className="space-y-2 text-right">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}