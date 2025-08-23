import { useMutation } from "@tanstack/react-query"
import { AuthErrorResponse } from "../server/types"
import { getRedirectPath } from "@/lib/auth-cookie"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { authApi } from "../api/api"
import { useAuthStore } from "@/stores/auth-store"

export const useLogin = () => {
  const router = useRouter()
  // const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      const user = data.data.user
      setUser(user)
      toast.success(`Welcome, ${user.name}`)
      router.push(getRedirectPath(user));
      // queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },

    onError: (error: AxiosError) => {
      const err = error.response?.data as AuthErrorResponse
      toast.error(err.message || "failed to login")
    }
  })
}