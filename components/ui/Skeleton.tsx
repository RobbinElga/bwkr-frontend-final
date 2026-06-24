import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn("animate-pulse rounded-lg bg-surface-container-high", className)} />
    );
}

export function ProgramCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest custom-shadow">
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="space-y-3 p-6">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="mt-4 h-10 w-full rounded-lg" />
            </div>
        </div>
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className="flex overflow-hidden rounded-2xl bg-white custom-shadow">
            <Skeleton className="hidden h-auto w-2/5 rounded-none md:block" />
            <div className="flex-1 space-y-3 p-8">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-2.5 w-full rounded-full" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export function NewsCardSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}

export function AchievementSkeleton() {
    return (
        <div className="flex flex-col items-center gap-3 text-center">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-4 w-20" />
        </div>
    );
}

export function PartnerSkeleton() {
    return <Skeleton className="h-10 w-24" />;
}

export function TestimonialSkeleton() {
    return (
        <div className="space-y-4 rounded-2xl border border-border-subtle bg-surface-container-lowest p-8 custom-shadow">
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 rounded" />
                ))}
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <div className="flex items-center gap-3 pt-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
        </div>
    );
}

export function VideoSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}

/* ---- Section-level fallback (dipakai di Suspense) ---- */

export function ProgramsSectionSkeleton() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-12 flex items-end justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)}
                </div>
            </div>
        </section>
    );
}

export function ProjectsSectionSkeleton() {
    return (
        <section className="bg-surface-gray py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-10 flex items-center justify-between">
                    <Skeleton className="h-8 w-48" />
                    <div className="flex gap-2">
                        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-9 w-20 rounded-full" />)}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
                </div>
            </div>
        </section>
    );
}

export function AchievementsSectionSkeleton() {
    return (
        <section className="bg-deep-forest py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 text-center">
                            <Skeleton className="h-10 w-28 bg-white/20" />
                            <Skeleton className="h-4 w-20 bg-white/20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function NewsSectionSkeleton() {
    return (
        <section className="bg-surface-gray py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-12 flex items-end justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-44" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => <NewsCardSkeleton key={i} />)}
                </div>
            </div>
        </section>
    );
}

export function TestimonialsSectionSkeleton() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <Skeleton className="mx-auto mb-16 h-8 w-32" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => <TestimonialSkeleton key={i} />)}
                </div>
            </div>
        </section>
    );
}

export function PartnersSectionSkeleton() {
    return (
        <section className="border-y border-border-subtle bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
                <Skeleton className="mx-auto mb-10 h-4 w-40" />
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                    {Array.from({ length: 4 }).map((_, i) => <PartnerSkeleton key={i} />)}
                </div>
            </div>
        </section>
    );
}