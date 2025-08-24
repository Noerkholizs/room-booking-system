"use client"

import { LoginCard } from "@/features/auth/components/login-card";
import { useCurrentUser } from "@/features/auth/hooks/use-current";
import { Role } from "@/features/auth/server/types";
import { redirect } from "next/navigation";

const SignInPage = () => {
    const { data, isLoading } = useCurrentUser();

    
    if (data && !isLoading) {
        if (data.role === Role.USER) {
            return redirect("/user/bookings");
        }
        return redirect("/admin/bookings");
    };
    
    return (
        <LoginCard />
    );
};
export default SignInPage
