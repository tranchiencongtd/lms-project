"use client";

import { usePathname } from "next/navigation";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SearchInput } from "./search-input";
import { UserButton } from "@/components/auth/user-button";

export const NavbarRoutes = () => {
  const user = useCurrentUser();
  let userId = user?.id;

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          {" "}
          <SearchInput />{" "}
        </div>
      )}
      <div className="flex gap-x-2 justify-between w-full">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <MoveLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Giáo viên
            </Button>
          </Link>
        ) : null}
      </div>
      <div>
        <UserButton />
      </div>
    </>
  );
};
