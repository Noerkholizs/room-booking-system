"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Building,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  ArrowRight,
  BarChart3,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/features/auth/hooks/use-current";
import { redirect } from "next/navigation";

const AdminDashboard = () => {

  const { data, isLoading} = useCurrentUser();
  
  if (!data && !isLoading) {
    return redirect("/login")
  }

  const stats = {
    totalBookings: 1247,
    pendingApprovals: 8,
    activeRooms: 12,
    totalUsers: 324,
    todayBookings: 23,
    utilization: 78
  };

  const recentBookings = [
    {
      id: 1,
      user: "John Doe",
      room: "Conference Room A",
      date: "2024-08-24",
      time: "09:00 - 11:00",
      status: "SUBMIT"
    },
    {
      id: 2,
      user: "Jane Smith", 
      room: "Meeting Room B",
      date: "2024-08-24",
      time: "14:00 - 16:00", 
      status: "APPROVED"
    },
    {
      id: 3,
      user: "Mike Johnson",
      room: "Board Room",
      date: "2024-08-25",
      time: "10:00 - 12:00",
      status: "SUBMIT"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'SUBMIT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-blue-100">
          Here&apos;s what&apos;s happening with your room booking system today.
        </p>
        <p className="text-blue-200 text-sm mt-2 italic">
          * All data displayed are mockup data for demonstration purposes
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.pendingApprovals}</div>
            <p className="text-xs text-blue-700 mt-1">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Active Rooms
            </CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.activeRooms}</div>
            <p className="text-xs text-green-700 mt-1">
              Available for booking
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.totalUsers}</div>
            <p className="text-xs text-purple-700 mt-1">
              Registered in system
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Todays Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.todayBookings}</div>
            <p className="text-xs text-orange-700 mt-1">
              Scheduled for today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Booking Requests</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/bookings">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{booking.user}</h4>
                      <Badge className={getStatusColor(booking.status)} variant="outline">
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600">{booking.room}</p>
                    <p className="text-xs text-slate-500">{booking.date} • {booking.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild className="h-20 flex-col gap-2">
                <Link href="/admin/bookings">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-sm">Approve Bookings</span>
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="h-20 flex-col gap-2">
                <Link href="/admin/rooms">
                  <Building className="h-6 w-6" />
                  <span className="text-sm">Manage Rooms</span>
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="h-20 flex-col gap-2">
                <Link href="/admin/schedule">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">View Schedule</span>
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="h-20 flex-col gap-2">
                <Link href="/admin/analytics">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Room Utilization</span>
                <span className="text-sm font-medium">{stats.utilization}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                  style={{ width: `${stats.utilization}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Bookings</span>
                <span className="font-medium">142</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Approved</span>
                <span className="font-medium text-green-600">128</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Rejected</span>
                <span className="font-medium text-red-600">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Pending</span>
                <span className="font-medium text-yellow-600">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-slate-700">Room conflict detected</p>
                  <p className="text-xs text-slate-500">Conference Room A - Today 2PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-slate-700">8 pending approvals</p>
                  <p className="text-xs text-slate-500">Require admin attention</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;