"use client"

import { useState } from 'react'
import { useDeleteBooking, useMyBookings } from "@/features/bookings/hooks/use-booking"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { id as ID } from 'date-fns/locale'
import { BookingFilter, BookingStatus } from "@/features/bookings/server/types"

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.APPROVED:
      return 'bg-green-100 text-green-800 border-green-200'
    case BookingStatus.REJECTED:
      return 'bg-red-100 text-red-800 border-red-200'
    case BookingStatus.SUBMIT:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.APPROVED:
      return <CheckCircle className="h-4 w-4" />
    case BookingStatus.REJECTED:
      return <XCircle className="h-4 w-4" />
    case BookingStatus.SUBMIT:
      return <AlertCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const formatTime = (date: Date) => {
  return format(new Date(date), 'HH:mm', { locale: ID })
}

const formatDate = (date: Date) => {
  return format(new Date(date), 'dd MMM yyyy', { locale: ID })
}

const getDuration = (startTime: Date, endTime: Date) => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const diffMs = end.getTime() - start.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  if (minutes === 0) {
    return `${hours} jam`
  }
  return `${hours}j ${minutes}m`
}

export const MyBookings = () => {
const [filters, setFilters] = useState<BookingFilter>({
    status: 'ALL',
    search: '',
  })
  
  const { data: bookings, isLoading, error } = useMyBookings(filters)
  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking()

  const handleFilterChange = (key: keyof BookingFilter, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }))
  }

  const handleDelete = (id: number) => {
    deleteBooking(id)
  }

  const canEditOrDelete = (status: BookingStatus) => {
    return status === BookingStatus.SUBMIT
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Bookings
          </h3>
          <p className="text-gray-600">
            Unable to load your bookings. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">
            Manage your room reservations and view booking status
          </p>
        </div>
        
        <Button asChild className="flex items-center">
          <Link href="/dashboard/user/bookings/new">
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookings..."
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={filters.status || 'ALL'}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value={BookingStatus.SUBMIT}>Submit</SelectItem>
                <SelectItem value={BookingStatus.APPROVED}>Approved</SelectItem>
                <SelectItem value={BookingStatus.REJECTED}>Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filters.status && filters.status !== 'ALL' 
              ? `${filters.status} Bookings` 
              : 'All Bookings'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                {filters.status && filters.status !== 'ALL'
                  ? `You don't have any ${filters.status.toLowerCase()} bookings.`
                  : "You haven't made any bookings yet."
                }
              </p>
              <Button asChild>
                <Link href="/dashboard/user/bookings/new">
                  Create Your First Booking
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {/* {booking.room.name} */}
                          Meet Room
                        </h3>
                        <Badge className={getStatusColor(booking.status)}>
                          <span className="flex items-center">
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(booking.startTime)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                        </span>
                        <span className="text-blue-600 font-medium">
                          ({getDuration(booking.startTime, booking.endTime)})
                        </span>
                      </div>
                      
                      {booking.notes && (
                        <p className="text-sm text-gray-700 bg-white p-2 rounded border-l-4 border-blue-200">
                          <strong>Purpose:</strong> {booking.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                    {canEditOrDelete(booking.status) && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex items-center"
                        >
                          <Link href={`/dashboard/user/bookings/${booking.id}/edit`}>
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                              disabled={isDeleting}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this booking for{' '}
                                <strong>Meet Room</strong> on{' '}
                                <strong>{formatDate(booking.startTime)}</strong>?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(booking.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Booking
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                    
                    {!canEditOrDelete(booking.status) && (
                      <div className="text-xs text-gray-500 px-3 py-1 bg-white rounded border">
                        {booking.status === BookingStatus.APPROVED 
                          ? "Approved - Cannot modify" 
                          : "Rejected - Cannot modify"
                        }
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}