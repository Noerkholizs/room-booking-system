import z from "zod"
import { loginSchema } from "./schema"

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface User {
    id: string
    email: string
    name: string
    role: Role
    createdAt: string
    updatedAt: string
}

export type LoginRequest = z.infer<typeof loginSchema>;

export interface LoginResponse {
    success: boolean
    statusCode: number
    message: string
    data: {
        user: User
        token: string
    }
}

export interface CurrentUserResponse {
    success: boolean
    statusCode: number
    message: string
    data: {
        user: User
    }
}

export interface AuthErrorResponse {
    success: boolean
    statusCode: number
    message: string
    errors: Record<string, string[]>
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}