"use client";

import { AdminBookingManagement } from "@/features/admin/components/admin-booking-management";
import { useCurrentUser } from "@/features/auth/hooks/use-current";
import { redirect } from "next/navigation";

const AdminBookingManagementPage = () => {
  const { data, isLoading} = useCurrentUser();
  
  if (!data && !isLoading) {
    return redirect("/login")
  }

  return (
    <AdminBookingManagement />
  )
};

export default AdminBookingManagementPage;