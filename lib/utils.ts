import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateHash(hash: string, start = 6, end = 4): string {
  if (!hash) return ''
  if (hash.length <= start + end) return hash
  return `${hash.slice(0, start)}...${hash.slice(-end)}`
}

export function formatTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  } catch (e) {
    return isoString
  }
}
