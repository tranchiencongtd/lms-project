"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Cá nhân",
    href: "/",
  },
  {
    icon: Compass,
    label: "Khám phá",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Khoá học",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Thống kê",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  const sidebarItems = routes.map((route) => (
    <SidebarItem
      key={route.href}
      icon={route.icon}
      label={route.label}
      href={route.href}
    />
  ));

  return <div className="flex flex-col w-full">{sidebarItems}</div>;
};
