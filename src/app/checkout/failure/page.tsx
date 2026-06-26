"use client";

import React from "react";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FailureCallbackPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-in fade-in duration-300">
        
        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center mx-auto text-red-600">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Payment Cancelled</h2>
          <p className="text-xs text-zinc-500">
            The eSewa transaction could not be processed successfully. This can happen if the wallet login timed out, the pin was incorrect, or the process was cancelled.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col gap-3">
          <Link
            href="/checkout"
            className="w-full bg-green-600 hover:bg-green-750 text-white font-bold text-xs py-3.5 rounded-xl shadow transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
          >
            Retry Checkout
          </Link>
          
          <Link
            href="/products"
            className="w-full border border-zinc-200 hover:bg-zinc-50 text-xs font-bold py-3.5 rounded-xl text-zinc-600 dark:text-zinc-300 flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
