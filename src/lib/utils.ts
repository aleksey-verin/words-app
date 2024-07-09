import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getShortName(input: string): string {
  const words = input.trim().split(/\s+/)
  let initials = ''
  if (words.length === 0 || (words.length === 1 && words[0] === '')) {
    return initials
  }
  if (words.length >= 1) {
    initials += words[0].charAt(0).toUpperCase()
  }
  if (words.length >= 2) {
    initials += words[1].charAt(0).toUpperCase()
  }

  return initials
}
