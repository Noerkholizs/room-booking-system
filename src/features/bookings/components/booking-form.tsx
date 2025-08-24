"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DottedSeparator } from "@/components/dotted-separator";
import { Calendar, Clock, MapPin, AlertCircle, Users } from "lucide-react";

import { useRooms } from "@/features/bookings/hooks/use-booking";

const bookingSchema = z.object({
  roomId: z.number().min(1, "Please select a room"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().max(255, "Notes must be less than 255 characters").optional(),
}).refine((data) => {
  const start = new Date(`${data.date}T${data.startTime}`);
  const end = new Date(`${data.date}T${data.endTime}`);
  return end > start;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
});

type TimeOption = {
  value: string;
  label: string;
};

export type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  title: string;
  description?: string;
  defaultValues?: Partial<BookingFormValues>;
  onSubmit: (values: BookingFormValues) => void;
  onCancel?: () => void;
  submitLabel: string;
  isLoading?: boolean;
}

export const BookingForm = ({
  title,
  description,
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel,
  isLoading = false
}: BookingFormProps) => {
  const { data: rooms, isLoading: isLoadingRooms, error: roomsError } = useRooms();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomId: undefined,
      startTime: "",
      endTime: "",
      date: "",
      notes: "",
      ...defaultValues,
    },
  });

  const today = new Date().toISOString().split('T')[0];

  const timeOptions: TimeOption[] = [];
  for (let hour = 8; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push({
        value: timeString,
        label: timeString
      });
    }
  }

  if (roomsError) {
    return (
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Rooms
            </h3>
            <p className="text-gray-600">
              Unable to load available rooms. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              {/* Room Selection */}
              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Meeting Room
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isLoading || isLoadingRooms}
                      >
                        <option value="">
                          {isLoadingRooms ? "Loading rooms..." : "Select a room"}
                        </option>
                        {rooms?.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name} {room.capacity && `(Capacity: ${room.capacity})`}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                    {/* Show selected room details */}
                    {form.watch('roomId') && rooms && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        {(() => {
                          const selectedRoom = rooms.find(r => r.id === form.watch('roomId'));
                          if (!selectedRoom) return null;
                          return (
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-blue-800">
                                <Users className="h-4 w-4 mr-1" />
                                <span>Capacity: {selectedRoom.capacity} people</span>
                              </div>
                              {selectedRoom.description && (
                                <p className="text-sm text-blue-700">{selectedRoom.description}</p>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              {/* Date Selection */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        min={today}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Selection Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isLoading}
                        >
                          <option value="">Select start time</option>
                          {timeOptions.map((time) => (
                            <option key={time.value} value={time.value}>
                              {time.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        End Time
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isLoading}
                        >
                          <option value="">Select end time</option>
                          {timeOptions
                            .filter(time => !form.watch('startTime') || time.value > form.watch('startTime'))
                            .map((time) => (
                              <option key={time.value} value={time.value}>
                                {time.label}
                              </option>
                            ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Duration Display */}
              {form.watch('startTime') && form.watch('endTime') && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center text-sm text-green-800">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      Duration: {(() => {
                        const start = new Date(`2000-01-01T${form.watch('startTime')}`);
                        const end = new Date(`2000-01-01T${form.watch('endTime')}`);
                        const diffMs = end.getTime() - start.getTime();
                        const hours = Math.floor(diffMs / (1000 * 60 * 60));
                        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                        
                        if (minutes === 0) {
                          return `${hours} hour${hours > 1 ? 's' : ''}`;
                        }
                        return `${hours}h ${minutes}m`;
                      })()}
                    </span>
                  </div>
                </div>
              )}

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Notes (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Purpose of the meeting, number of attendees, special requirements, etc."
                        className="resize-none"
                        rows={4}
                        disabled={isLoading}
                        maxLength={255}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <span className="text-xs text-muted-foreground">
                        {field.value?.length || 0}/255
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <DottedSeparator className="py-7" />

            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isLoading}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || isLoadingRooms}
              >
                {isLoading ? "Processing..." : submitLabel}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};