"use client";

import Sidebar from "./components/Sidebar";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-green-600 text-white p-4 md:ml-0">
          <h1 className="text-2xl font-bold">Govinda Cycle Shop Admin</h1>
        </header>

        <main className="max-w-6xl mx-auto py-8 px-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link
              href="/admin/products"
              className="p-6 bg-white dark:bg-gray-800 rounded shadow hover:bg-green-50 dark:hover:bg-green-900 transition"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/orders"
              className="p-6 bg-white dark:bg-gray-800 rounded shadow hover:bg-green-50 dark:hover:bg-green-900 transition"
            >
              Manage Orders
            </Link>
            <Link
              href="/admin/categories"
              className="p-6 bg-white dark:bg-gray-800 rounded shadow hover:bg-green-50 dark:hover:bg-green-900 transition"
            >
              Manage Categories
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
