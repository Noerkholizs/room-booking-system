import { User } from "@/features/auth/server/types"
import { create } from "zustand"


interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (u) => set({user: u}),
    clearUser: () => set({user: null}),
}));