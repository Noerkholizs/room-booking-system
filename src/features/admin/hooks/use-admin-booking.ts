import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createBooking, deleteBooking, fetchBookingById, fetchAdminBookings, fetchRooms, updateBooking } from "../api/api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { GlobalErrorResponse } from "@/lib/types/types"
import { BookingFilter } from "../../bookings/server/types"

export const useAdminBookings = (filters?: BookingFilter) => {
  return useQuery({
    queryKey: ['admin-bookings', filters],
    queryFn: () => fetchAdminBookings(filters),
    refetchOnWindowFocus: false,
  })
}

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => fetchBookingById(id),
    enabled: !!id,
  })
}

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      queryClient.invalidateQueries({ queryKey: ['recent-bookings'] })
      
      toast.success('Booking berhasil dibuat!')
    },
    onError: (errors: AxiosError) => {
        const error = errors.response?.data as GlobalErrorResponse    
        toast.error(error.message || 'Gagal membuat booking')
    },
  })
}

export const useUpdateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBooking,
    onSuccess: (updatedBooking) => {
      queryClient.setQueryData(['booking', updatedBooking.id], updatedBooking)
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
      
      toast.success('Booking berhasil diupdate!')
    },
    onError: (errors: AxiosError) => {
      const error = errors.response?.data as GlobalErrorResponse
      toast.error(error.message || 'Gagal mengupdate booking')
    },
  })
}

export const useDeleteBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      
      toast.success('Booking berhasil dihapus!')
    },
    onError: (errors: AxiosError) => {
        const error = errors.response?.data as GlobalErrorResponse
        toast.error(error.message || 'Gagal menghapus booking')
    },
  })
}