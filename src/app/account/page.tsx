"use client";

import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function AccountPage() {
  // Later replace this with real auth state
  const isLoggedIn = false;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow rounded-lg p-6">

        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <UserCircleIcon className="w-14 h-14 text-gray-600 dark:text-gray-300" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              My Account
            </h1>
            <p className="text-sm text-gray-500">
              Manage your account information
            </p>
          </div>
        </div>

        {/* Content */}
        {!isLoggedIn ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              You are not logged in
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-6 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
              >
                Register
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AccountItem label="Name" value="John Doe" />
            <AccountItem label="Email" value="john@example.com" />
            <AccountItem label="Phone" value="+977 98XXXXXXXX" />

            <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AccountItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}
