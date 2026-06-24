import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gabung className Tailwind dengan rapi (hindari konflik). */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}