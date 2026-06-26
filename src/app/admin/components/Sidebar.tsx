"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logOut } from "@/store/authSlice";
import { LayoutDashboard, Bike, ListOrdered, Library, LogOut, ChevronLeft } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Secure admin routes
  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "ADMIN" && user?.role !== "STAFF") {
      alert("Access Denied: Admin/Staff credentials required!");
      router.push("/");
    }
  }, [isAuthenticated, user, router, mounted]);

  const handleSignOut = () => {
    dispatch(logOut());
    alert("Admin session closed.");
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Bike },
    { name: "Orders", href: "/admin/orders", icon: ListOrdered },
    { name: "Categories", href: "/admin/categories", icon: Library },
  ];

  if (!mounted || !isAuthenticated || (user?.role !== "ADMIN" && user?.role !== "STAFF")) {
    return null;
  }

  return (
    <aside className="w-64 bg-zinc-900 text-zinc-100 min-h-screen flex flex-col border-r border-zinc-800 font-sans">
      {/* Brand logo */}
      <div className="p-6 text-center border-b border-zinc-800 space-y-1">
        <h3 className="font-extrabold text-lg text-green-500 tracking-tight">Kritan Cycles</h3>
        <span className="text-[10px] text-zinc-400 font-semibold tracking-widest uppercase">Admin Panel</span>
      </div>

      {/* User profile card */}
      <div className="p-4 mx-4 my-4 bg-zinc-800 border border-zinc-800 rounded-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-extrabold flex items-center justify-center text-sm uppercase">
          {user?.name?.[0]}
        </div>
        <div className="flex-1 text-left min-w-0">
          <h4 className="font-bold text-xs text-zinc-200 truncate">{user?.name}</h4>
          <span className="text-[9px] text-zinc-500 uppercase font-semibold">{user?.role}</span>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" /> {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-1.5 w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs py-2 rounded-lg transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> View Main Site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-1.5 w-full border border-red-500/20 hover:bg-red-500/10 text-red-500 font-bold text-xs py-2 rounded-lg transition"
        >
          <LogOut className="w-3.5 h-3.5" /> Logout Session
        </button>
      </div>
    </aside>
  );
}
