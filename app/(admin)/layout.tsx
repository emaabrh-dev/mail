// app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/lib/styles/theme";
import MainLayout from "@/components/layout/MainLayout";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout withSidebar>{children}</MainLayout>
    </ThemeProvider>
  );
}
