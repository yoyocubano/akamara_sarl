import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes intelligently.
 * Imported from Welux Events architecture to standardize UI development in Akamara.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
