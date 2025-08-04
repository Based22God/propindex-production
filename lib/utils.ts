import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price with proper currency
export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `£${(price / 1000000).toFixed(1)}M`
  } else if (price >= 1000) {
    return `£${(price / 1000).toFixed(0)}K`
  }
  return `£${price.toLocaleString()}`
}

// Format date relative to now
export function formatRelativeDate(date: Date | string): string {
  const now = new Date()
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const diffInMs = now.getTime() - targetDate.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}

// Validate UK postcode
export function isValidPostcode(postcode: string): boolean {
  const postcodeRegex = /^[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}$/i
  return postcodeRegex.test(postcode.replace(/\s+/g, ''))
}

// Clean and format postcode
export function formatPostcode(postcode: string): string {
  return postcode.replace(/\s+/g, '').toUpperCase()
}

// Calculate price change percentage
export function calculatePriceChange(currentPrice: number, originalPrice: number): {
  percentage: number
  direction: 'up' | 'down' | 'same'
  formatted: string
} {
  if (originalPrice === 0) return { percentage: 0, direction: 'same', formatted: '0%' }
  
  const change = currentPrice - originalPrice
  const percentage = (change / originalPrice) * 100
  
  let direction: 'up' | 'down' | 'same' = 'same'
  if (percentage > 0) direction = 'up'
  else if (percentage < 0) direction = 'down'
  
  const formatted = `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`
  
  return { percentage: Math.abs(percentage), direction, formatted }
}

// Debounce function for API calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Sleep utility for testing
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString('en-GB')
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Truncate text with ellipsis
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Check if device is mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Local storage helpers with error handling
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage errors silently
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch {
      // Handle storage errors silently
    }
  }
}
