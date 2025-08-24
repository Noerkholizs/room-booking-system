"use client"

import { redirect } from 'next/navigation';


import { useCurrentUser } from "@/features/auth/hooks/use-current";
import { CreateBookingForm } from "@/features/user/components/create-booking-form";

const CreateBookingPage = () => {
  const { data, isLoading} = useCurrentUser();

  if (!data && !isLoading) return redirect("/login");

  
  return (
    <div className="w-full lg:max-w-7xl">
        <CreateBookingForm />
    </div>
  )
}

export default CreateBookingPage;