"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <CartProvider>
      {!isAdminPage && <Navbar />}
      <main className={!isAdminPage ? "pt-16" : ""}>{children}</main>
    </CartProvider>
  );
}
