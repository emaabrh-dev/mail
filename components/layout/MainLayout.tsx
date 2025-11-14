"use client";

import { ReactNode } from "react";
import DefaultLayout from "./DefaultLayout";
import SidebarLayout from "./SidebarLayout";

type MainLayoutProps = {
  children: ReactNode;
  withSidebar?: boolean; // optional, default false
};

export default function MainLayout({ children, withSidebar = false }: MainLayoutProps) {
  if (withSidebar) {
    return <SidebarLayout>{children}</SidebarLayout>;
  }
  return <DefaultLayout>{children}</DefaultLayout>;
}
