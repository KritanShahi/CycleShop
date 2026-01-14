"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Function to load cart count
  const loadCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce(
      (sum: number, item: any) => sum + (item.quantity || 1),
      0
    );
    setCartCount(total);
  };

  useEffect(() => {
    // Load initially
    loadCartCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
    };
  }, []);

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
            <Link href="/" className="nav-link">Home</Link>
            <Link href="#about" className="nav-link">About Us</Link>
            <Link href="#explore" className="nav-link">Shop</Link>
            <Link href="/Bicycle" className="nav-link">Bicycle</Link>
            <Link href="#categories" className="nav-link">Contact Us</Link>
            <Link href="#accessories" className="nav-link">Accessories</Link>
            <Link href="/account" className="nav-link">Account</Link>

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
        <div className="md:hidden bg-white dark:bg-black px-4 py-4 space-y-2 shadow-md">
          <Link href="/" className="mobile-link">Home</Link>
          <Link href="#about" className="mobile-link">About Us</Link>
          <Link href="#explore" className="mobile-link">Shop</Link>
          <Link href="/Bicycle" className="mobile-link">Bicycle</Link>
          <Link href="#categories" className="mobile-link">Categories</Link>
          <Link href="#accessories" className="mobile-link">Accessories</Link>
          <Link href="#account" className="mobile-link">Account</Link>
        </div>
      )}
    </nav>
  );
}
