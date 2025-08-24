"use client";

import { Role } from "@/features/auth/server/types";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/use-current";


const EntryPoint = () =>  {
    const { data, isLoading } = useCurrentUser();
    
    if (data && !isLoading) {
        if (data.role === Role.USER) {
            return redirect("/user/bookings");
        }
        return redirect("/admin");
    };
    return redirect("/login")
}

export default EntryPoint;