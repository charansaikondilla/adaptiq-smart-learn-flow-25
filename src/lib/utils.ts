
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper for formatting dates
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Helper for status colors
export function getStatusColor(status: string) {
  switch(status.toLowerCase()) {
    case 'excellent': return 'bg-green-500';
    case 'good': return 'bg-blue-500';
    case 'needs improvement': return 'bg-yellow-500';
    case 'struggling': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}
