import api from "@/lib/api";
import { 
    Room, 
    Booking, 
    BookingFilter,
    CreateBookingRequest, 
    UpdateBookingRequest,
    BookingWithRelations,
    AdminUpdateBookingRequest,
    BookingStatus, 
} from "../../bookings/server/types";

export const fetchAdminBookings = async (filters?: BookingFilter): Promise<BookingWithRelations[]> => {
  const params = new URLSearchParams()
  
  if (filters?.status && filters.status !== 'ALL') {
    params.append('status', filters.status)
  }
  if (filters?.roomId) {
    params.append('roomId', filters.roomId)
  }
  if (filters?.dateFrom) {
    params.append('dateFrom', filters.dateFrom)
  }
  if (filters?.dateTo) {
    params.append('dateTo', filters.dateTo)
  }
  if (filters?.search) {
    params.append('search', filters.search)
  }

  const response = await api.get(`/api/v1/admin/bookings?${params.toString()}`)

  return response.data.data
}

export const fetchBookingById = async (id: string): Promise<Booking> => {
  const response = await api.get(`/api/v1/booking/${id}`)
  return response.data.data
}

export const createBooking = async (data: CreateBookingRequest): Promise<Booking> => {
  const response = await api.post('/api/v1/booking/create', data)
  return response.data.data
}

export const updateBooking = async ({ id, data }: { id: number; data: AdminUpdateBookingRequest }): Promise<Booking> => {
  const response = await api.put(`/api/v1/admin/bookings/${id}/status`, data)
  return response.data.data
}

export const deleteBooking = async (id: number): Promise<void> => {
  await api.delete(`/api/v1/booking/delete/${id}`)
}

export const fetchRooms = async (): Promise<Room[]> => {
  const response = await api.get('/api/v1/rooms')
  return response.data.data
}