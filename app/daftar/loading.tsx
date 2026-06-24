import { Skeleton } from "@/components/ui/Skeleton";

export default function DaftarLoading() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-20">
            <div className="w-full max-w-lg space-y-8">
                <Skeleton className="mx-auto h-12 w-24" />
                <div className="rounded-xl border border-border-subtle bg-white p-8 custom-shadow md:p-12 space-y-6">
                    <div className="space-y-2 text-center">
                        <Skeleton className="mx-auto h-8 w-56" />
                        <Skeleton className="mx-auto h-4 w-72" />
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                        ))}
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-5 w-5 rounded" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                        <Skeleton className="h-14 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </main>
    );
}