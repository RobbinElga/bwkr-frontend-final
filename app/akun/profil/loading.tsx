import { Skeleton } from "@/components/ui/Skeleton";

export default function ProfilLoading() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-9 w-52" />
                <Skeleton className="h-4 w-72" />
            </div>

            {/* Seksi informasi */}
            <section className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-7 w-40" />
                </div>

                {/* Foto profil */}
                <div className="mb-6 flex flex-col items-center gap-5 border-b border-border-subtle pb-6 sm:flex-row">
                    <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
                    <div className="space-y-2 text-center sm:text-left">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                    ))}
                </div>
                <div className="mt-5 flex justify-end">
                    <Skeleton className="h-12 w-40 rounded-xl" />
                </div>
            </section>

            {/* Seksi keamanan */}
            <section className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-7 w-36" />
                </div>
                <div className="max-w-2xl space-y-5">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Skeleton className="h-12 w-44 rounded-xl" />
                    </div>
                </div>
            </section>
        </div>
    );
}