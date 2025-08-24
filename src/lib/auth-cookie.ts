// src/lib/auth.ts

import { User } from "@/features/auth/server/types"


export const isAdmin = (user: User | null): boolean => {
  return user?.role === "ADMIN"
}

export const getRedirectPath = (user: User): string => {
  return isAdmin(user) ? '/admin/bookings' : '/user/bookings'
}

export const hasRole = (user: User | null, role: User['role']): boolean => {
  return user?.role === role
}

export const hasAnyRole = (user: User | null, roles: User['role'][]): boolean => {
  return user ? roles.includes(user.role) : false
}