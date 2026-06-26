"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Provider } from "react-redux";
import store from "@/store";
import Chatbot from "@/components/Chatbot";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin") ?? false;

  return (
    <Provider store={store}>
      <CartProvider>
        {!isAdminPage ? (
          <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        ) : (
          <main>{children}</main>
        )}
        {!isAdminPage && <Chatbot />}
      </CartProvider>
    </Provider>
  );
}
