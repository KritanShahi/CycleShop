"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}  {/* Show Navbar only on non-admin pages */}
      <main className={!isAdminPage ? "pt-16" : ""}>{children}</main>
    </>
  );
}
