"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calendar, UserIcon } from "lucide-react";
import { GoHome, GoHomeFill } from "react-icons/go";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
// import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";

const routes = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: "My Bookings",
        href: "/user/bookings",
        icon: BookOpen,
        activeIcon: BookOpen
    },
    {
        label: "New Booking",
        href: "/user/bookings/create",
        icon: Calendar,
        activeIcon: Calendar
    },
    {
        label: "profile",
        href: "/user/profile",
        icon: UserIcon,
        activeIcon: UserIcon
    },
];

export const Navigation = () => {
    // const workspaceId = useWorkSpaceId();
    const pathname = usePathname();

    return (
        <Card className="p-4">
            <ul className="flex flex-col">
                {routes.map((item) => {
                    const fullHref = item.href
                    const isActive = pathname === fullHref;
                    const Icon = isActive ? item.activeIcon : item.icon;

                    return (
                        <Link key={item.href} href={fullHref}>
                            <div className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors",
                                isActive && "bg-blue-50 shadow-sm hover:opacity-100 text-blue-600"
                            )}>
                                <Icon className="h-4 w-4 mr-3"/>
                                {item.label}
                            </div>
                        </Link>
                    )
                })}
            </ul>
        </Card>
    );
};