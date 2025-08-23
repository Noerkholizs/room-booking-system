"use client";

import { useCurrentUser } from "@/features/auth/hooks/use-current";
import { MyBookings } from "@/features/user/components/mybookings";
import { redirect } from "next/navigation";


export default function MyBookingsPage() {
  const { data, isLoading} = useCurrentUser();

  
  if (!data && !isLoading) {
    return redirect("/login")
  }

  return (
    <MyBookings />
  )
}