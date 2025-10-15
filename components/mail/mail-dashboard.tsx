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
