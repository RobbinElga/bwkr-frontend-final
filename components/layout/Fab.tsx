import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function Fab() {
    return (
        <Link
            href="/donasi"
            aria-label="Wakaf Sekarang"
            className="fixed bottom-8 right-8 z-40 hidden h-14 w-14 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container shadow-2xl transition-all hover:scale-110 active:scale-95 md:flex"
        >
            <Icon name="volunteer_activism" filled />
        </Link>
    );
}