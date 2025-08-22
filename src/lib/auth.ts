// src/lib/auth.ts

import { User } from "@/features/auth/server/types"

// Get user from localStorage (sebagai fallback)
export const getStoredUser = (): User | null => {
  // if (typeof window === 'undefined') return null
  
  try {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

// Store user in localStorage (sebagai fallback)
export const setStoredUser = (user: User) => {
  // if (typeof window === 'undefined') return
  localStorage.setItem('user', JSON.stringify(user))
}

export const setStoredToken = (token: string) => {
  // if (typeof window === 'undefined') return
  localStorage.setItem('auth-token', JSON.stringify(token))
}

// Clear stored user
export const clearStoredUser = () => {
  // if (typeof window === 'undefined') return
  localStorage.removeItem('user')
}

// Check if user is admin
export const isAdmin = (user: User | null): boolean => {
  return user?.role === "ADMIN"
}

// Get redirect path based on user role
export const getRedirectPath = (user: User): string => {
  return isAdmin(user) ? '/admin' : '/user/bookings'
}