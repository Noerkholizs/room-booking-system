import api from "@/lib/api"
import { useMutation } from "@tanstack/react-query"
import { AuthErrorResponse, LoginRequest, LoginResponse } from "../server/types"
import { getRedirectPath, setStoredToken, setStoredUser } from "@/lib/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"


const LoginApi = async (credentialls: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/api/v1/auth/login', credentialls)

    if (!response) {
        throw new Error()
    }

    return response.data
}

export const useLogin = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: LoginApi,
        onSuccess: (data) => {
            const { user, token } = data.data

            setStoredUser(user)
            setStoredToken(token)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            toast.success(`Selamat datang ${user.name}`)

            const redirectPath = getRedirectPath(user)
            router.push(redirectPath)
        },

        onError: (errors: AxiosError) => {
            console.log(errors)
            const error = errors.response?.data as AuthErrorResponse
            
            toast.error(error.message || "Terjadi Kesalahan")
        }
    })
}