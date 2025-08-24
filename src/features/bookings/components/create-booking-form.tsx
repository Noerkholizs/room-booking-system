"use client";

import { useRouter } from "next/navigation";
import { useCreateBooking } from "@/features/bookings/hooks/use-booking";
import { BookingForm, BookingFormValues } from "./booking-form";

interface CreateBookingFormProps {
  onCancel?: () => void;
}

export const CreateBookingForm = ({ onCancel }: CreateBookingFormProps) => {
  const router = useRouter();
  const { mutate: createBookingMutation, isPending } = useCreateBooking();

  const handleSubmit = (values: BookingFormValues) => {
    const startDateTime = new Date(`${values.date}T${values.startTime}`).toISOString();
    const endDateTime = new Date(`${values.date}T${values.endTime}`).toISOString();

    const bookingData = {
      roomId: values.roomId,
      startTime: startDateTime,
      endTime: endDateTime,
      notes: values.notes || undefined,
    };

    createBookingMutation(bookingData, {
      onSuccess: () => {
        router.push("/user/bookings");
      },
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <BookingForm
      title="Create New Booking"
      description="Reserve a meeting room for your event or meeting"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitLabel="Create Booking"
      isLoading={isPending}
    />
  );
};