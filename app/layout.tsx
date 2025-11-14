"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/lib/styles/theme";
import MainLayout from "@/components/layout/MainLayout";

type RootLayoutProps = {
  children: ReactNode;
  withSidebar?: boolean; // optional, default false
};

export default function RootLayout({
  children,
  withSidebar = false,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout withSidebar={withSidebar}>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
