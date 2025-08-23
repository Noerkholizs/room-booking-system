import { useAuthStore } from "@/stores/auth-store";

export const useAuth = () => {
  const { user, setUser } = useAuthStore();
  return {
    user,
    setUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isUser: user?.role === "USER",
    hasRole: (role: string) => user?.role === role,
  };
};




























// import { create } from 'zustand'
// import { toast } from 'sonner'
// import React from "react"
// import { LoginRequest, User } from "../server/types"
// import { authApi } from "../api/api"

// interface AuthState {
//   user: User | null
//   isLoading: boolean
//   isHydrated: boolean
//   error: string | null
// }

// interface AuthActions {
//   login: (credentials: LoginRequest) => Promise<boolean>
//   logout: () => Promise<void>
//   getCurrentUser: () => Promise<void>
//   initialize: () => Promise<void>
//   reset: () => void
// }

// export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
//   // State
//   user: null,
//   isLoading: true,
//   isHydrated: false,
//   error: null,

//   // Actions
//   login: async (credentials: LoginRequest) => {
//     try {
//       set({ isLoading: true, error: null })
      
//       const response = await authApi.login(credentials)
      
//       if (response.success) {
//         set({ 
//           user: response.data.user, 
//           isLoading: false,
//           error: null 
//         })
        
//         toast.success(`Selamat datang ${response.data.user.name}`)
//         return true
//       }
      
//       throw new Error(response.message || 'Login failed')
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || error.message || 'Login failed'
      
//       set({ 
//         user: null, 
//         isLoading: false, 
//         error: errorMessage 
//       })
      
//       toast.error(errorMessage)
//       return false
//     }
//   },

//   logout: async () => {
//     try {
//       set({ isLoading: true })
//       await authApi.logout()
//     } catch (error) {
//       console.error('Logout error:', error)
//     } finally {
//       set({ 
//         user: null, 
//         isLoading: false, 
//         isHydrated: true, 
//         error: null 
//       })
//       toast.success('Berhasil logout')
//     }
//   },

//   getCurrentUser: async () => {
//     try {
//       const user = await authApi.getCurrentUser()
//       set({ user, error: null })
//     } catch (error) {
//       set({ user: null, error: 'Failed to get current user' })
//       throw error
//     }
//   },

//   initialize: async () => {
//     if (typeof window === 'undefined') return
    
//     try {
//       set({ isLoading: true, error: null })
//       const user = await authApi.getCurrentUser()
//       set({ 
//         user, 
//         isLoading: false, 
//         isHydrated: true, 
//         error: null 
//       })
//     } catch (error) {
//       set({ 
//         user: null, 
//         isLoading: false, 
//         isHydrated: true, 
//         error: null 
//       })
//     }
//   },

//   reset: () => {
//     set({
//       user: null,
//       isLoading: false,
//       isHydrated: false,
//       error: null
//     })
//   }
// }))

// // Custom hooks untuk kemudahan
// export const useAuth = () => {
//   const store = useAuthStore()
  
//   React.useEffect(() => {
//     store.initialize()
//   }, [])
  
//   return {
//     ...store,
//     isAuthenticated: !!store.user,
//     isAdmin: store.user?.role === 'ADMIN',
//     isUser: store.user?.role === 'USER',
//     hasRole: (role: User['role']) => store.user?.role === role,
//   }
// }