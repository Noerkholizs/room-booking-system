"use client"

import { AdminSidebar } from "@/features/admin/components/sidebar"
import { AdminNavbar } from "@/features/admin/components/navbar"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <AdminSidebar />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardLayout;