#!/bin/bash

# Create folder structure
mkdir -p app
mkdir -p components/{admin,auth,mail,ui}
mkdir -p hooks
mkdir -p lib
mkdir -p public
mkdir -p styles

# Create files in app
touch app/globals.css
touch app/layout.tsx
touch app/page.tsx

# Components - admin
touch components/admin/admin-dashboard.tsx

# Components - auth
touch components/auth/login-form.tsx

# Components - mail
touch components/mail/compose-modal.tsx
touch components/mail/email-detail-modal.tsx
touch components/mail/mail-dashboard.tsx

# Components - ui
touch components/ui/{accordion,alert-dialog,alert,aspect-ratio,avatar,badge,breadcrumb,button,calendar,card,carousel,chart,checkbox,collapsible,command,context-menu,dialog,drawer,dropdown-menu,form,hover-card,input-otp,input,label,menubar,navigation-menu,pagination,popover,progress,radio-group,resizable,scroll-area,select,separator,sheet,sidebar,skeleton,slider,sonner,switch,table,tabs,textarea,toast,toaster,toggle-group,toggle,tooltip,theme-provider}.tsx

# Hooks
touch hooks/use-mobile.ts
touch hooks/use-toast.ts

# Lib
touch lib/utils.ts

# Public assets
touch public/placeholder-logo.png
touch public/placeholder-logo.svg
touch public/placeholder-user.jpg
touch public/placeholder.jpg
touch public/placeholder.svg

# Styles
touch styles/globals.css

# Root files
touch .gitignore
touch bun.lock
touch components.json
touch next.config.mjs
touch package.json
touch postcss.config.mjs

echo "✅ Project structure created successfully."
