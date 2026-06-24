import { cn } from "@/lib/utils";

type IconProps = {
    name: string;
    className?: string;
    filled?: boolean;
};

/** Ikon Material Symbols. Contoh: <Icon name="volunteer_activism" /> */
export function Icon({ name, className, filled = false }: IconProps) {
    return (
        <span
            className={cn("material-symbols-outlined select-none align-middle", className)}
            style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
            {name}
        </span>
    );
}