
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
