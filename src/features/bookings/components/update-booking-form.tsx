"use client";

import { useUpdateBooking } from "@/features/bookings/hooks/use-booking";
import { BookingForm, BookingFormValues } from "./booking-form";
import { BookingWithRelations } from "@/features/bookings/server/types";
import { format } from "date-fns";

interface UpdateBookingFormProps {
  booking: BookingWithRelations;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UpdateBookingForm = ({ 
  booking, 
  onSuccess, 
  onCancel 
}: UpdateBookingFormProps) => {
  const { mutate: updateBookingMutation, isPending } = useUpdateBooking();

  const defaultValues: Partial<BookingFormValues> = {
    roomId: booking.roomId,
    date: format(new Date(booking.startTime), 'yyyy-MM-dd'),
    startTime: format(new Date(booking.startTime), 'HH:mm'),
    endTime: format(new Date(booking.endTime), 'HH:mm'),
    notes: booking.notes || "",
  };

  const handleSubmit = (values: BookingFormValues) => {
    const startDateTime = new Date(`${values.date}T${values.startTime}`).toISOString();
    const endDateTime = new Date(`${values.date}T${values.endTime}`).toISOString();

    const updateData = {
      roomId: values.roomId,
      startTime: startDateTime,
      endTime: endDateTime,
      notes: values.notes || undefined,
    };

    updateBookingMutation({
      id: booking.id.toString(),
      data: updateData
    }, {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };

  return (
    <BookingForm
      title="Update Booking"
      description={`Update your booking for ${booking.room.name}`}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel="Update Booking"
      isLoading={isPending}
    />
  );
};