import api from "@/lib/api";
import { 
    Room, 
    Booking, 
    BookingFilter,
    CreateBookingRequest, 
    UpdateBookingRequest,
    BookingWithRelations, 
} from "../server/types";

export const fetchMyBookings = async (filters?: BookingFilter): Promise<BookingWithRelations[]> => {
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

  const response = await api.get(`/api/v1/booking/my-bookings?${params.toString()}`)

  return response.data.data
}

export const fetchBookingById = async (id: string): Promise<Booking> => {
  const response = await api.get(`/api/v1/bookings/${id}`)
  return response.data.data
}

export const createBooking = async (data: CreateBookingRequest): Promise<Booking> => {
  const response = await api.post('/api/v1/bookings', data)
  return response.data.data
}

export const updateBooking = async ({ id, data }: { id: string; data: UpdateBookingRequest }): Promise<Booking> => {
  const response = await api.patch(`/api/v1/bookings/${id}`, data)
  return response.data.data
}

export const deleteBooking = async (id: number): Promise<void> => {
  await api.delete(`/api/v1/bookings/${id}`)
}

export const fetchRooms = async (): Promise<Room[]> => {
  const response = await api.get('/api/v1/rooms')
  return response.data.data
}

export const checkRoomAvailability = async (params: {
  roomId: string
  date: string
  startTime: string
  duration: number
  excludeBookingId?: string
}): Promise<{ available: boolean; conflictingBookings?: Booking[] }> => {
  const response = await api.post('/api/v1/bookings/check-availability', params)
  return response.data.data
}