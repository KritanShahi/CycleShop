"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="bg-white dark:bg-black shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-green-600 dark:text-green-400"
          >
            Kritan Cycle Shop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="nav-link font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">Home</Link>
            <Link href="/products" className="nav-link font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">Shop</Link>
            <Link href="/categories" className="nav-link font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">Categories</Link>
            <Link href="/Bicycle" className="nav-link font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">Quick List</Link>
            <Link href="/about" className="nav-link font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">About Us</Link>
            <Link href="/account" className="nav-link font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">Account</Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="w-7 h-7 text-gray-700 dark:text-gray-200 hover:text-green-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-4">

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black px-4 py-4 space-y-2 shadow-md flex flex-col">
          <Link href="/" className="mobile-link py-2 font-medium text-gray-700 dark:text-gray-200 border-b border-zinc-100 dark:border-zinc-900" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/products" className="mobile-link py-2 font-medium text-gray-700 dark:text-gray-200 border-b border-zinc-100 dark:border-zinc-900" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link href="/categories" className="mobile-link py-2 font-medium text-gray-700 dark:text-gray-200 border-b border-zinc-100 dark:border-zinc-900" onClick={() => setIsOpen(false)}>Categories</Link>
          <Link href="/Bicycle" className="mobile-link py-2 font-medium text-gray-700 dark:text-gray-200 border-b border-zinc-100 dark:border-zinc-900" onClick={() => setIsOpen(false)}>Quick List</Link>
          <Link href="/about" className="mobile-link py-2 font-medium text-gray-700 dark:text-gray-200 border-b border-zinc-100 dark:border-zinc-900" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/account" className="mobile-link py-2 font-medium text-gray-700 dark:text-gray-200" onClick={() => setIsOpen(false)}>Account</Link>
        </div>
      )}
    </nav>
  );
}
