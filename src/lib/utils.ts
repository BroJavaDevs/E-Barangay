import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDeviceType(): string {
  const userAgent = navigator.userAgent || '';
  
  // Check for mobile devices
  if (/android/i.test(userAgent)) {
    return 'Mobile';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !navigator.maxTouchPoints) {
    return 'Mobile';
  }

  // Check for tablets
  if (/tablet/i.test(userAgent)) {
    return 'Tablet';
  }

  // Check for desktops and laptops
  if (/Windows NT|Macintosh|Linux/.test(userAgent)) {
    return 'Desktop or Laptop';
  }

  return 'Unknown Device';
}