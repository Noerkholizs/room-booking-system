import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthErrorResponse } from "../server/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { authApi } from "../api/api"
import { useAuthStore } from "@/stores/auth-store"

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setUser(null)
      toast.success("Logout successfull")
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },

    onError: (error: AxiosError) => {
      const err = error.response?.data as AuthErrorResponse
      toast.error(err.message || "failed to logout")
    }
  })
}