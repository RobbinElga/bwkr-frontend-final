import Image from "next/image";

export function Avatar({ name, src, size = 40, className = "" }: {
    name: string;
    src?: string | null;
    size?: number;
    className?: string;
}) {
    const initial = name?.charAt(0).toUpperCase() ?? "?";
    return (
        <div
            className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-container text-on-primary ${className}`}
            style={{ width: size, height: size }}
        >
            {src ? (
                <Image src={src} alt={name} fill className="object-cover" sizes={`${size}px`} priority />
            ) : (
                <span style={{ fontSize: size * 0.4 }} className="font-bold">{initial}</span>
            )}
        </div>
    );
}