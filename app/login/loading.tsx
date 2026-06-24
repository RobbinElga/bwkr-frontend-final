import { Skeleton } from "@/components/ui/Skeleton";

export default function LoginLoading() {
    return (
        <main className="flex min-h-screen w-full flex-col md:flex-row">
            {/* Panel kiri */}
            <div className="hidden w-1/2 bg-primary md:block lg:w-3/5" />

            {/* Panel kanan */}
            <section className="flex w-full flex-col items-center justify-center bg-surface px-6 py-12 md:w-1/2 md:px-10 lg:w-2/5">
                <div className="w-full max-w-[420px] space-y-8">
                    <Skeleton className="h-8 w-48 md:hidden mx-auto" />
                    <div className="space-y-2">
                        <Skeleton className="h-9 w-64" />
                        <Skeleton className="h-4 w-80" />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                        <Skeleton className="h-14 w-full rounded-xl" />
                    </div>
                </div>
            </section>
        </main>
    );
}