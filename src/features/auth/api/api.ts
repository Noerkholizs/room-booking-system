import api from "@/lib/api"
import { LoginRequest, LoginResponse, User } from "../server/types"

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/v1/auth/login', credentials)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/api/v1/auth/logout')
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/v1/auth/current-user')
    return response.data.data
  },

  refresh: async (): Promise<void> => {
    await api.post('/api/v1/auth/refresh')
  },

  checkAuth: async (): Promise<boolean> => {
    try {
      await authApi.getCurrentUser()
      return true
    } catch (error) {
        console.log("Error checkauth ", error)
      return false
    }
  }
}