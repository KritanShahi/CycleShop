import React from "react";
import Link from "next/link";
import { Bike, Mail, Phone, MapPin, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800 font-sans mt-auto">
      {/* Top Banner: Store Badges */}
      <div className="border-b border-zinc-800 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-zinc-800 text-green-500 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-zinc-100 uppercase tracking-wider">Free Valley Shipping</h4>
              <p className="text-xs text-zinc-400 mt-1">Prompt and free door-to-door courier service inside Kathmandu Valley.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-zinc-800 text-green-500 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-zinc-100 uppercase tracking-wider">Genuine Parts Only</h4>
              <p className="text-xs text-zinc-400 mt-1">100% authentic Shimano gears, durable alloy frames, and reliable brakes.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-zinc-800 text-green-500 rounded-xl">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-zinc-100 uppercase tracking-wider">One-Year Warranty</h4>
              <p className="text-xs text-zinc-400 mt-1">Complete peace of mind frame warranty and direct repair support service.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Block */}
        <div className="md:col-span-5 space-y-4 text-left">
          <div className="flex items-center gap-2 text-green-500">
            <Bike className="w-7 h-7" />
            <span className="font-black text-xl tracking-tight text-white">Kritan Cycles</span>
          </div>
          <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
            Nestled in the historic market hub of Kathmandu at Ason, Kritan Cycle Shop has been Nepals trusted choice for premium mountain, road, hybrid, and kids bicycles since 2050 B.S.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-800 hover:bg-green-600 text-zinc-300 hover:text-white rounded-lg transition"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-800 hover:bg-green-600 text-zinc-300 hover:text-white rounded-lg transition"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h3 className="font-extrabold text-xs text-white uppercase tracking-widest">Navigation</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors">Home Page</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-green-400 transition-colors">Shop Catalog</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-green-400 transition-colors">Categories</Link>
            </li>
            <li>
              <Link href="/Bicycle" className="hover:text-green-400 transition-colors">Quick List</Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-green-400 transition-colors">My Account</Link>
            </li>
          </ul>
        </div>

        {/* Contact Block */}
        <div className="md:col-span-4 space-y-4 text-left">
          <h3 className="font-extrabold text-xs text-white uppercase tracking-widest">Store Address</h3>
          <ul className="space-y-3 text-xs text-zinc-400">
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Ason Chowk, Ward 27, Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>+977-1-42XXXXX, 98XXXXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>info@kritancycleshop.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-zinc-800 bg-zinc-950/60 py-6 text-center text-[10px] text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Kritan Cycle Shop. All rights reserved. Registered under Nepal Commerce Board.</p>
      </div>
    </footer>
  );
}
