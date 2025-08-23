"use client"

import { Menu } from "lucide-react";
import { UserButton } from "@/components/user-button";
import { useCurrentUser } from "@/features/auth/hooks/use-current";

export const Navbar = () => {
    const { isLoading, data} = useCurrentUser();

    if (!isLoading && !data) {
        return null
    }
    
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Menu className="h-6 w-6 text-gray-600 lg:hidden mr-3" />
                        <h1 className="text-xl font-semibold text-gray-900">
                            Room Booking System
                        </h1>
                    </div>
                        
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            Welcome, <span className="font-medium">{data?.name}</span>
                        </span>
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};