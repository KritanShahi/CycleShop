"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEsewaPaymentMutation } from "@/store/ordersApi";
import { ShieldCheck, HelpCircle, CheckCircle, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function SuccessCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const encodedData = searchParams?.get("data") || "";
  const { clearCart } = useCart();

  const [verifyEsewaPayment, { isLoading, error, data }] = useVerifyEsewaPaymentMutation();
  const [verificationTriggered, setVerificationTriggered] = useState(false);

  useEffect(() => {
    if (encodedData && !verificationTriggered) {
      setVerificationTriggered(true);
      verifyEsewaPayment({ encodedData })
        .unwrap()
        .then(() => {
          clearCart();
          console.log("eSewa payment successfully verified on backend!");
        })
        .catch((err) => {
          console.error("Verification failed:", err);
        });
    }
  }, [encodedData, verifyEsewaPayment, verificationTriggered, clearCart]);

  if (!encodedData) {
    return (
      <div className="text-center py-20">
        <HelpCircle className="w-16 h-16 text-zinc-300 mx-auto mb-4 animate-bounce" />
        <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">No callback data detected</h3>
        <p className="text-zinc-500 text-xs mt-1">If you checked out via Cash on Delivery, your order status is in your account.</p>
        <Link
          href="/account"
          className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow"
        >
          View Dashboard
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-24 space-y-4">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h3 className="font-bold text-lg">Verifying eSewa Payment...</h3>
        <p className="text-zinc-500 text-xs">Connecting to secure eSewa servers. Please do not close or reload this window.</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20 space-y-4">
        <HelpCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h3 className="font-bold text-lg text-red-600">Payment Verification Failed</h3>
        <p className="text-zinc-500 text-xs">
          {(error as any)?.data?.error || "We could not verify the transaction with eSewa."}
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/checkout"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs px-6 py-2.5 rounded-full"
          >
            Retry Checkout
          </Link>
          <Link
            href="/account"
            className="border border-zinc-200 hover:bg-zinc-50 text-xs font-bold px-6 py-2.5 rounded-full text-zinc-600 dark:text-zinc-300"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-in fade-in duration-300">
      
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/20 flex items-center justify-center mx-auto text-green-600">
        <CheckCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Payment Successful!</h2>
        <p className="text-xs text-zinc-500">
          Your payment has been successfully processed via eSewa. Order #{data.order?.id} is now being prepared for shipping!
        </p>
      </div>

      {/* Transaction Summary */}
      <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl text-left divide-y divide-zinc-100 dark:divide-zinc-800 text-xs space-y-2">
        <div className="flex justify-between py-1 text-zinc-500">
          <span>Order ID</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">#{data.order?.id}</span>
        </div>
        <div className="flex justify-between py-1 text-zinc-500">
          <span>Transaction Ref</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">{data.order?.paymentId || "eSewa Direct"}</span>
        </div>
        <div className="flex justify-between py-1 text-zinc-500">
          <span>Amount Paid</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">Rs. {data.order?.finalTotal?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-1 text-zinc-500">
          <span>Payment Method</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">eSewa Wallet</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        {data.pdfInvoiceUrl && (
          <a
            href={`http://localhost:5000${data.pdfInvoiceUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black font-bold text-xs py-3.5 rounded-xl shadow transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
          >
            <FileText className="w-4 h-4" /> Download PDF Invoice
          </a>
        )}

        <Link
          href="/account"
          className="flex-1 bg-green-600 hover:bg-green-750 text-white font-bold text-xs py-3.5 rounded-xl shadow transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
        >
          Track My Orders <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-400">
        <ShieldCheck className="w-4 h-4 text-green-600" /> Secure digital invoice issued by Kritan Cycle Shop
      </div>
    </div>
  );
}

export default function SuccessCallbackPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
      <Suspense fallback={
        <div className="text-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="font-bold text-lg">Initializing payment callback...</h3>
        </div>
      }>
        <SuccessCallbackContent />
      </Suspense>
    </div>
  );
}
