"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Send, Inbox, Archive, Trash2, LogOut, Plus, Search, Filter, Star, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ComposeModal } from "./compose-modal"
import { EmailDetailModal } from "./email-detail-modal"
import { useToast } from "@/hooks/use-toast"

interface Email {
  id: number
  from: string
  subject: string
  preview: string
  time: string
  unread: boolean
  important: boolean
  body?: string
}

interface MailDashboardProps {
  user: { email: string; name: string } | null
  onLogout: () => void
}

export function MailDashboard({ user, onLogout }: MailDashboardProps) {
  const [activeTab, setActiveTab] = useState("inbox")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedEmails, setSelectedEmails] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      from: "john.doe@company.com",
      subject: "Q4 Budget Review Meeting",
      preview: "Hi team, I wanted to schedule our quarterly budget review...",
      time: "2 hours ago",
      unread: true,
      important: true,
      body: "Hi team,\n\nI wanted to schedule our quarterly budget review meeting for next week. Please review the attached documents and come prepared with your department's spending analysis.\n\nBest regards,\nJohn",
    },
    {
      id: 2,
      from: "sarah.wilson@company.com",
      subject: "Project Update - Website Redesign",
      preview: "The new website mockups are ready for review. Please find...",
      time: "4 hours ago",
      unread: true,
      important: false,
      body: "Hi everyone,\n\nThe new website mockups are ready for review. Please find the designs attached and let me know your feedback by Friday.\n\nThanks,\nSarah",
    },
    {
      id: 3,
      from: "marketing@company.com",
      subject: "Monthly Newsletter - December 2024",
      preview: "Check out this months highlights and upcoming events...",
      time: "1 day ago",
      unread: false,
      important: false,
      body: "Dear Team,\n\nCheck out this month's highlights and upcoming events. We've had a great quarter and are looking forward to the new year.\n\nBest,\nMarketing Team",
    },
    {
      id: 4,
      from: "hr@company.com",
      subject: "Holiday Schedule Reminder",
      preview: "Just a friendly reminder about our upcoming holiday schedule...",
      time: "2 days ago",
      unread: false,
      important: false,
    },
    {
      id: 5,
      from: "support@company.com",
      subject: "System Maintenance Notice",
      preview: "We will be performing scheduled maintenance on our servers...",
      time: "3 days ago",
      unread: false,
      important: true,
    },
  ])

  const sidebarItems = [
    { id: "inbox", label: "Inbox", icon: Inbox, count: emails.filter((e) => e.unread).length },
    { id: "sent", label: "Sent", icon: Send, count: 0 },
    { id: "archive", label: "Archive", icon: Archive, count: 0 },
    { id: "trash", label: "Trash", icon: Trash2, count: 3 },
  ]

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email)
    setIsDetailOpen(true)

    // Mark as read when opened
    if (email.unread) {
      setEmails((prev) => prev.map((e) => (e.id === email.id ? { ...e, unread: false } : e)))
    }
  }

  const handleArchiveEmail = (emailId: number) => {
    setEmails((prev) => prev.filter((e) => e.id !== emailId))
    toast({
      title: "Email archived",
      description: "The email has been moved to your archive.",
    })
  }

  const handleDeleteEmail = (emailId: number) => {
    setEmails((prev) => prev.filter((e) => e.id !== emailId))
    toast({
      title: "Email deleted",
      description: "The email has been moved to trash.",
    })
  }

  const handleMarkImportant = (emailId: number) => {
    setEmails((prev) => prev.map((e) => (e.id === emailId ? { ...e, important: !e.important } : e)))
    const email = emails.find((e) => e.id === emailId)
    toast({
      title: email?.important ? "Removed from important" : "Marked as important",
      description: email?.important ? "Email unmarked as important." : "Email marked as important.",
    })
  }

  const handleSelectEmail = (emailId: number, checked: boolean) => {
    if (checked) {
      setSelectedEmails((prev) => [...prev, emailId])
    } else {
      setSelectedEmails((prev) => prev.filter((id) => id !== emailId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(filteredEmails.map((e) => e.id))
    } else {
      setSelectedEmails([])
    }
  }

  const handleBulkArchive = () => {
    setEmails((prev) => prev.filter((e) => !selectedEmails.includes(e.id)))
    setSelectedEmails([])
    toast({
      title: "Emails archived",
      description: `${selectedEmails.length} emails have been archived.`,
    })
  }

  const handleBulkDelete = () => {
    setEmails((prev) => prev.filter((e) => !selectedEmails.includes(e.id)))
    setSelectedEmails([])
    toast({
      title: "Emails deleted",
      description: `${selectedEmails.length} emails have been deleted.`,
    })
  }

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">Mail Management</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setIsComposeOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Compose
            </Button>

            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user?.name}</span>
            </div>

            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card h-[calc(100vh-73px)]">
          <div className="p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                    {item.count > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Search and Filter Bar */}
          <div className="border-b bg-card px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search emails..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedEmails.length > 0 && (
            <div className="border-b bg-muted/50 px-6 py-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{selectedEmails.length} selected</span>
                <Button variant="outline" size="sm" onClick={handleBulkArchive}>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Email List */}
          <div className="p-6">
            {/* Select All */}
            <div className="flex items-center gap-3 mb-4 pb-2 border-b">
              <Checkbox
                checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-muted-foreground">{filteredEmails.length} emails</span>
            </div>

            <div className="space-y-2">
              {filteredEmails.map((email) => (
                <Card
                  key={email.id}
                  className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                    email.unread ? "border-l-4 border-l-primary" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedEmails.includes(email.id)}
                        onCheckedChange={(checked) => handleSelectEmail(email.id, checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <div className="flex-1 min-w-0" onClick={() => handleEmailClick(email)}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm ${email.unread ? "font-semibold" : "font-medium"}`}>
                            {email.from}
                          </span>
                          {email.important && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                        </div>
                        <h3 className={`text-sm mb-1 ${email.unread ? "font-semibold" : "font-normal"}`}>
                          {email.subject}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">{email.preview}</p>
                      </div>

                      <div className="text-xs text-muted-foreground ml-4">{email.time}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEmails.length === 0 && (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No emails found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search terms." : "Your inbox is empty."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Compose Modal */}
      <ComposeModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />

      {/* Email Detail Modal */}
      <EmailDetailModal
        email={selectedEmail}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onArchive={handleArchiveEmail}
        onDelete={handleDeleteEmail}
        onMarkImportant={handleMarkImportant}
      />
    </div>
  )
}
