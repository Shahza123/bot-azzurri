import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names into one, merging Tailwind CSS classes intelligently.
 * Utilizes `clsx` for conditional class names and `twMerge` to resolve conflicts.
 *
 * @param inputs - An array of class names, which can be strings, objects, or arrays.
 * @returns A single string containing all the merged class names.
 */
export function cn (...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
