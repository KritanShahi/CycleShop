"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-600 text-white min-h-screen hidden md:flex flex-col">
      <div className="p-6 text-center font-bold text-xl border-b border-green-500">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          href="/admin"
          className="block px-4 py-2 rounded hover:bg-green-500 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="block px-4 py-2 rounded hover:bg-green-500 transition"
        >
          Manage Products
        </Link>
        <Link
          href="/admin/orders"
          className="block px-4 py-2 rounded hover:bg-green-500 transition"
        >
          Manage Orders
        </Link>
        <Link
          href="/admin/categories"
          className="block px-4 py-2 rounded hover:bg-green-500 transition"
        >
          Manage Categories
        </Link>
      </nav>
    </aside>
  );
}
