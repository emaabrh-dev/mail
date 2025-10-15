                  <CardTitle>Email Configuration</CardTitle>
                  <CardDescription>Configure email server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>SMTP Server</Label>
                    <Input value="smtp.company.com" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Port</Label>
                    <Input value="587" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Security</Label>
                    <Input value="TLS" readOnly />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-Factor Authentication</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Policy</span>
                    <Badge variant="default">Strong</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Timeout</span>
                    <Badge variant="secondary">30 minutes</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
