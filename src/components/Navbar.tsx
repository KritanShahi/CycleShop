"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
              Kritan Cycle Shop
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-green-600">Home</Link>
            <Link href="#about" className="text-gray-700 dark:text-gray-200 hover:text-green-600">About Us</Link>
            <Link href="#explore" className="text-gray-700 dark:text-gray-200 hover:text-green-600">Shop</Link>
            <Link href="#categories" className="text-gray-700 dark:text-gray-200 hover:text-green-600">Categories</Link>
            <Link href="#accessories" className="text-gray-700 dark:text-gray-200 hover:text-green-600">Accessories</Link>
            <Link href="#account" className="text-gray-700 dark:text-gray-200 hover:text-green-600">Account</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none"
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
        <div className="md:hidden bg-white dark:bg-black px-2 pt-2 pb-4 space-y-1 shadow-md">
          <Link href="/" className="block px-3 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
          <Link href="#about" className="block px-3 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-800">About Us</Link>
          <Link href="#explore" className="block px-3 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Shop</Link>
          <Link href="#categories" className="block px-3 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Categories</Link>
          <Link href="#accessories" className="block px-3 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Accessories</Link>
          <Link href="#account" className="block px-3 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Account</Link>
        </div>
      )}
    </nav>
  );
}
