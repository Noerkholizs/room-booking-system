import z from "zod";
import { CreateBookingSchema, UpdateBookingSchema } from "./schema";

export enum BookingStatus {
  SUBMIT = 'SUBMIT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
};

export type CreateBookingRequest = z.infer<typeof CreateBookingSchema>;
export type UpdateBookingRequest = z.infer<typeof UpdateBookingSchema>;

export interface Booking {
  id: number;
  roomId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface BookingWithRelations extends Booking {
  room: Room
  user: {
    id: number
    name: string
    email: string
  }
}

export interface BookingFilter {
  status?: BookingStatus | 'ALL'
  roomId?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface Room {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}