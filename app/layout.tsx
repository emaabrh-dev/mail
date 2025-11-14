"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme } from "@/lib/styles/theme";
import MainLayout from "@/components/layout/MainLayout";

import 'dayjs/locale/fr';

type RootLayoutProps = {
  children: ReactNode;
  withSidebar?: boolean; // optional, default false
};

export default function RootLayout({
  children,
  withSidebar = false,
}: RootLayoutProps) {
  return (
    <html lang="fr">
      <head />
      <body>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout withSidebar={withSidebar}>{children}</MainLayout>
          </ThemeProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
