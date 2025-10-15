"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Reply, ReplyAll, Forward, Archive, Trash2, Star } from "lucide-react"

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

interface EmailDetailModalProps {
  email: Email | null
  isOpen: boolean
  onClose: () => void
  onArchive: (id: number) => void
  onDelete: (id: number) => void
  onMarkImportant: (id: number) => void
}

export function EmailDetailModal({
  email,
  isOpen,
  onClose,
  onArchive,
  onDelete,
  onMarkImportant,
}: EmailDetailModalProps) {
  if (!email) return null

  const fullBody =
    email.body ||
    `${email.preview}

This is the full email content. In a real application, this would contain the complete email message with proper formatting, images, and attachments.

Best regards,
${email.from.split("@")[0]}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-lg mb-2">{email.subject}</DialogTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">{email.from.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{email.from}</span>
                </div>
                <span>•</span>
                <span>{email.time}</span>
                {email.important && (
                  <>
                    <span>•</span>
                    <Badge variant="destructive" className="text-xs">
                      Important
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 py-4 border-b">
          <Button variant="outline" size="sm">
            <Reply className="w-4 h-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <ReplyAll className="w-4 h-4 mr-2" />
            Reply All
          </Button>
          <Button variant="outline" size="sm">
            <Forward className="w-4 h-4 mr-2" />
            Forward
          </Button>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={() => onMarkImportant(email.id)}>
            <Star className={`w-4 h-4 mr-2 ${email.important ? "fill-current" : ""}`} />
            {email.important ? "Unstar" : "Star"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onArchive(email.id)
              onClose()
            }}
          >
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onDelete(email.id)
              onClose()
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>

        {/* Email Body */}
        <div className="py-6">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{fullBody}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
