"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logOut } from "@/store/authSlice";
import { useGetMyOrdersQuery } from "@/store/ordersApi";
import { User, LogOut, FileText, ShoppingBag, Truck, Calendar, DollarSign } from "lucide-react";
import { getProductImage } from "@/utils/imageResolver";

export default function AccountDashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  const { data: orders = [], isLoading, refetch } = useGetMyOrdersQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      refetch();
    }
  }, [isAuthenticated, router, refetch]);

  const handleLogout = () => {
    dispatch(logOut());
    alert("Logged out successfully.");
    router.push("/");
  };

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-6 max-w-7xl mx-auto font-sans grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Sidebar: Profile Summary */}
      <aside className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-6 self-start text-center">
        <div className="w-20 h-20 bg-green-50 dark:bg-green-950/20 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <User className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h2 className="font-extrabold text-lg text-zinc-900 dark:text-white">{user.name}</h2>
          <p className="text-xs text-zinc-500">{user.email}</p>
          <span className="inline-block bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            {user.role} Member
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full border border-red-200 hover:bg-red-50 dark:hover:bg-red-950/10 text-red-600 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out Session
        </button>
      </aside>

      {/* Main Content: Orders History */}
      <main className="lg:col-span-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Your Order History</h2>
          <p className="text-xs text-zinc-500 mt-1">Track payments and shipping progress for all purchases.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
            <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-bold text-base">No orders placed yet</h3>
            <p className="text-zinc-500 text-xs mt-1">Place your first cycle order today and track it here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow transition-shadow"
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="space-y-0.5 text-left">
                    <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-100">Order ID: #{order.id}</h3>
                    <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Shipping Status */}
                    <span
                      className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700 dark:bg-green-950/20"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700 dark:bg-red-950/20"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/20"
                      }`}
                    >
                      Shipping: {order.status}
                    </span>

                    {/* Payment Status */}
                    <span
                      className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        order.paymentStatus === "COMPLETED"
                          ? "bg-green-100 text-green-700 dark:bg-green-950/20"
                          : "bg-red-100 text-red-700 dark:bg-red-950/20"
                      }`}
                    >
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items preview list */}
                <div className="space-y-3">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 rounded-lg overflow-hidden flex items-center justify-center p-0.5">
                          <img
                            src={getProductImage(item.product?.imageUrl, item.product?.type || item.product?.name)}
                            alt={item.product?.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-zinc-900 dark:text-white block">{item.product?.name || "Genuine Cycle/Part"}</span>
                          <span className="text-[10px] text-zinc-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer calculations and invoice PDF link */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-sm font-black text-zinc-900 dark:text-white">
                    <DollarSign className="w-4 h-4 text-green-600" /> Total Paid: Rs. {order.finalTotal?.toLocaleString()}
                  </div>

                  {order.pdfInvoiceUrl ? (
                    <a
                      href={`http://localhost:5000${order.pdfInvoiceUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-green-600 dark:bg-zinc-800 dark:hover:bg-green-700 hover:text-white border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 transition"
                    >
                      <FileText className="w-4 h-4" /> Download PDF Invoice
                    </a>
                  ) : (
                    <span className="text-[10px] text-zinc-400 italic">Invoice pending payment verification</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
