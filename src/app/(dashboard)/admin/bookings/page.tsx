"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  User,
  Building,
  Download,
  RefreshCw,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { AdminUpdateBookingRequest, BookingStatus, BookingWithRelations } from "@/features/bookings/server/types";
import { useAdminBookings, useUpdateBooking } from "@/features/admin/hooks/use-admin-booking";

interface AdminBookingFilters {
  status: 'ALL' | BookingStatus;
  search: string;
  dateFrom: string;
  dateTo: string;
  roomId: string;
}

const AdminBookingManagement = () => {
  const [selectedBookings, setSelectedBookings] = useState<number[]>([]);
  const [filters, setFilters] = useState<AdminBookingFilters>({
    status: 'ALL',
    search: '',
    dateFrom: '',
    dateTo: '',
    roomId: ''
  });

  // State untuk bulk actions
  const [bulkAction, setBulkAction] = useState<{
    open: boolean;
    action: 'approve' | 'reject' | null;
    loading: boolean;
  }>({ open: false, action: null, loading: false });

  // State untuk single actions
  const [singleActionLoading, setSingleActionLoading] = useState<{
    [key: number]: boolean;
  }>({});

  // Fetch data dengan custom hook
  const { 
    data: bookings = [], 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useAdminBookings(filters);


    const { mutate: updateBookingMutation , isPending } = useUpdateBooking();


  useEffect(() => {
    if (!isLoading && bookings) {
      console.log("Admin bookings data:", bookings);
    }
    if (error) {
      console.error("Error fetching bookings:", error);
    }
  }, [bookings, isLoading, error]);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.APPROVED:
        return 'bg-green-100 text-green-800 border-green-200';
      case BookingStatus.REJECTED:
        return 'bg-red-100 text-red-800 border-red-200';
      case BookingStatus.SUBMIT:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.APPROVED:
        return <CheckCircle className="h-4 w-4" />;
      case BookingStatus.REJECTED:
        return <XCircle className="h-4 w-4" />;
      case BookingStatus.SUBMIT:
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             Loading Bookings...
//           </h3>
//           <p className="text-gray-600">
//             Please wait while we fetch the booking data.
//           </p>
//         </div>
//       </div>
//     );
//   }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Bookings
          </h3>
          <p className="text-gray-600 mb-4">
            {error?.message || "Unable to load bookings. Please try again."}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allBookingIds = bookings.map(booking => booking.id);
      setSelectedBookings(allBookingIds);
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (bookingId: number, checked: boolean) => {
    if (checked) {
      setSelectedBookings(prev => [...prev, bookingId]);
    } else {
      setSelectedBookings(prev => prev.filter(id => id !== bookingId));
    }
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    setBulkAction({ open: true, action, loading: false });
  };

  const confirmBulkAction = async () => {
    if (!bulkAction.action) return;

    setBulkAction(prev => ({ ...prev, loading: true }));

    try {
      // TODO: Replace dengan actual API call
      const endpoint = `/api/admin/bookings/bulk-${bulkAction.action}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingIds: selectedBookings }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${bulkAction.action} bookings`);
      }

      // Refresh data setelah bulk action berhasil
      await refetch();
      
      // Reset state
      setSelectedBookings([]);
      setBulkAction({ open: false, action: null, loading: false });
      
      // TODO: Tambahkan toast notification
      console.log(`Successfully ${bulkAction.action}ed ${selectedBookings.length} bookings`);
      
    } catch (error) {
      console.error(`Error in bulk ${bulkAction.action}:`, error);
      setBulkAction(prev => ({ ...prev, loading: false }));
      // TODO: Tambahkan error toast notification
    }
  };

  const handleStatusChange = async (bookingId: number, status: BookingStatus.APPROVED | BookingStatus.REJECTED) => {
    setSingleActionLoading(prev => ({ ...prev, [bookingId]: true }));

    const data = {
        status: status
    }

    updateBookingMutation({
        id: bookingId, 
        data: data
    })
  };


  const handleRefresh = () => {
    refetch();
  };

  const handleExport = async () => {
    try {
      // TODO: Implement export functionality
      const response = await fetch('/api/admin/bookings/export', {
        method: 'GET',
        headers: {
          'Accept': 'application/csv',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export bookings');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookings-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Export error:', error);
      // TODO: Add error toast
    }
  };

  // Filter bookings (tetap untuk client-side filtering jika diperlukan)
  const filteredBookings = bookings.filter(booking => {
    // Jika filtering sudah dilakukan di server via useAdminBookings, 
    // bagian ini mungkin tidak diperlukan
    return true;
  });

  // Calculate stats
  const pendingCount = bookings.filter(b => b.status === BookingStatus.SUBMIT).length;
  const approvedCount = bookings.filter(b => b.status === BookingStatus.APPROVED).length;
  const rejectedCount = bookings.filter(b => b.status === BookingStatus.REJECTED).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600">
            Manage and approve booking requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"> */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookings..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value as any  }))}
            >
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value={BookingStatus.SUBMIT}>Submit</SelectItem>
                <SelectItem value={BookingStatus.APPROVED}>Approved</SelectItem>
                <SelectItem value={BookingStatus.REJECTED}>Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Date From */}
            {/* <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              placeholder="From date"
            /> */}

            {/* Date To */}
            {/* <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              placeholder="To date"
            /> */}

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => setFilters({
                status: 'ALL',
                search: '',
                dateFrom: '',
                dateTo: '',
                roomId: ''
              })}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedBookings.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-900">
                  {selectedBookings.length} booking(s) selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={bulkAction.loading}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve Selected
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleBulkAction('reject')}
                  disabled={bulkAction.loading}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedBookings([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Booking Requests ({filteredBookings.length})
            {isRefetching && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-12">
                    <Checkbox
                      checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead> */}
                  <TableHead >User</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-gray-50">
                    {/* <TableCell>
                      <Checkbox
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={(checked) => handleSelectBooking(booking.id, checked as boolean)}
                      />
                    </TableCell> */}
                    
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{booking.user.name}</p>
                          <p className="text-xs text-gray-500">{booking.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-sm">{booking.room.name}</p>
                          <p className="text-xs text-gray-500">Capacity: {booking.room.capacity}</p>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">
                          {format(new Date(booking.startTime), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(booking.startTime), 'HH:mm')} - {format(new Date(booking.endTime), 'HH:mm')}
                        </p>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {(() => {
                          const diffMs = new Date(booking.endTime).getTime() - new Date(booking.startTime).getTime();
                          const hours = Math.floor(diffMs / (1000 * 60 * 60));
                          const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                          return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
                        })()}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-xs text-gray-500">
                        {format(new Date(booking.createdAt), 'MMM dd, HH:mm')}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      {booking.notes ? (
                        <div className="max-w-32">
                          <p className="text-xs text-gray-600 truncate" title={booking.notes}>
                            {booking.notes}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No notes</span>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={isPending}>
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MoreHorizontal className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {booking.status === BookingStatus.SUBMIT && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(booking.id, BookingStatus.APPROVED)}
                                className="text-green-600"
                                disabled={isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(booking.id, BookingStatus.REJECTED)}
                                className="text-red-600"
                                disabled={isPending}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredBookings.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600">No bookings match your current filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Action Confirmation Dialog */}
      <AlertDialog open={bulkAction.open} onOpenChange={(open) => setBulkAction({ open, action: null, loading: false })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bulkAction.action === 'approve' ? 'Approve' : 'Reject'} Bookings
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {bulkAction.action} {selectedBookings.length} selected booking(s)? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkAction.loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkAction}
              disabled={bulkAction.loading}
              className={bulkAction.action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {bulkAction.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {bulkAction.action === 'approve' ? 'Approve' : 'Reject'} Bookings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBookingManagement;