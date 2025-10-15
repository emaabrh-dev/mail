"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { MailDashboard } from "@/components/mail/mail-dashboard"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string; role?: string } | null>(null)

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app this would call an API
    if (email && password) {
      const isAdmin = email.includes("admin") || email === "admin@company.com"
      setUser({
        email,
        name: email.split("@")[0],
        role: isAdmin ? "admin" : "user",
      })
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  // Show admin dashboard for admin users
  if (user?.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />
  }

  // Show regular mail dashboard for regular users
  return <MailDashboard user={user} onLogout={handleLogout} />
}
