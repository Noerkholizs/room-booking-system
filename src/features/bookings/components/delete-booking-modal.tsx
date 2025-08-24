"use client";

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
import { useDeleteBooking } from "@/features/bookings/hooks/use-booking";
import { BookingWithRelations } from "@/features/bookings/server/types";
import { format } from "date-fns";

interface DeleteBookingModalProps {
  booking: BookingWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteBookingModal = ({
  booking,
  open,
  onOpenChange,
}: DeleteBookingModalProps) => {
  const { mutate: deleteBooking, isPending } = useDeleteBooking();

  const handleDelete = () => {
    if (!booking) return;
    
    deleteBooking(booking.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (!booking) return null;

  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd MMM yyyy');
  };

  const formatTime = (date: Date) => {
    return format(new Date(date), 'HH:mm');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Booking</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete this booking?
            </p>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="space-y-1 text-sm">
                <p><strong>Room:</strong> {booking.room.name}</p>
                <p><strong>Date:</strong> {formatDate(booking.startTime)}</p>
                <p><strong>Time:</strong> {formatTime(booking.startTime)} - {formatTime(booking.endTime)}</p>
                {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
              </div>
            </div>
            <p className="text-red-600 font-medium">
              This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete Booking"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};