"use client"

import { Sidebar } from "@/features/user/components/sidebar"
import { Navbar } from "@/features/user/components/navbar"

interface UserDashboardLayoutProps {
  children: React.ReactNode
}

const UserDashboardLayout = ({ children }: UserDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <Sidebar />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default UserDashboardLayout;