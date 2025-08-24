// Path: src/features/admin/components/navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Calendar, 
  CheckSquare, 
  Settings,
  Users,
  Building,
  Shield,
  Home,
  FileText
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const routes = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: Home,
    description: "Overview & Analytics"
  },
  {
    label: "Booking Management",
    href: "/admin/bookings",
    icon: CheckSquare,
    description: "Approve & Manage Bookings",
    // badge: "3"
  },
  {
    label: "Room Management",
    href: "/admin/rooms",
    icon: Building,
    description: "Manage Meeting Rooms"
  },
  {
    label: "User Management", 
    href: "/admin/users",
    icon: Users,
    description: "Manage User Accounts"
  },
  {
    label: "Schedule Overview",
    href: "/admin/schedule",
    icon: Calendar,
    description: "Room Schedules & Conflicts"
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Reports & Statistics"
  },
  {
    label: "Activity Logs",
    href: "/admin/logs",
    icon: FileText,
    description: "System Activity"
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "System Configuration"
  },
];

export const AdminNavigation = () => {
  const pathname = usePathname();

  return (
    <Card className="p-4 bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <span className="font-semibold">Admin Panel</span>
        </div>
        <p className="text-xs text-blue-100 mt-1">Room Management System</p>
      </div>

      <ul className="flex flex-col space-y-1">
        {routes.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link href={item.href}>
                <div className={cn(
                  "group flex items-start gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md",
                  isActive && "bg-gradient-to-r from-blue-100 to-purple-100 shadow-md border border-blue-200/50"
                )}>
                  <Icon className={cn(
                    "h-5 w-5 mt-0.5 flex-shrink-0 transition-colors",
                    isActive 
                      ? "text-blue-600" 
                      : "text-slate-500 group-hover:text-blue-600"
                  )} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "font-medium transition-colors",
                        isActive 
                          ? "text-blue-900" 
                          : "text-slate-700 group-hover:text-blue-900"
                      )}>
                        {item.label}
                      </span>
                      {/* {item.badge && (
                        <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                          {item.badge}
                        </Badge>
                      )} */}
                    </div>
                    <p className={cn(
                      "text-xs mt-0.5 transition-colors",
                      isActive 
                        ? "text-blue-700" 
                        : "text-slate-500 group-hover:text-blue-700"
                    )}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Pending Approvals</span>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              3
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Active Rooms</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              8
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Total Users</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              124
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};