"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } from "@/store/ordersApi";
import { FileText, ShoppingBag, Truck, DollarSign, Calendar, SlidersHorizontal } from "lucide-react";

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [page, setPage] = useState(1);

  // API Hooks
  const { data, isLoading } = useGetAdminOrdersQuery({
    status: statusFilter || undefined,
    paymentStatus: paymentFilter || undefined,
    page,
    limit: 10,
  });

  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (id: number, field: "status" | "paymentStatus", val: string) => {
    try {
      await updateOrderStatus({ id, [field]: val }).unwrap();
      alert("Order updated successfully!");
    } catch (err: any) {
      alert(err?.data?.error || "Failed to update order status.");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <Sidebar />

      <div className="flex-1 space-y-6 p-8">
        
        {/* Header */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h1 className="text-2xl font-black tracking-tight">Manage Orders</h1>
          <p className="text-xs text-zinc-500 mt-1">Track payments, delivery shipments, and issue digital invoices.</p>
        </header>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs">
          <span className="font-bold flex items-center gap-1.5 text-zinc-500 uppercase tracking-wide">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Logs:
          </span>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg focus:outline-none"
          >
            <option value="">All Shipping Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg focus:outline-none"
          >
            <option value="">All Payment Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white dark:bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : !data?.orders || data.orders.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 text-xs">No customer orders matching these criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="space-y-0.5 text-left text-xs">
                    <h3 className="font-bold text-sm">Order ID: #{order.id}</h3>
                    <p className="text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="text-zinc-500 font-semibold mt-1">
                      Customer: {order.user?.name} ({order.user?.email})
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {/* Shipping selector */}
                    <div className="space-y-1">
                      <span className="block text-[9px] uppercase font-bold text-zinc-400">Shipping Status</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, "status", e.target.value)}
                        disabled={isUpdating}
                        className="px-2 py-1 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-[10px] font-bold"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>

                    {/* Payment status selector */}
                    <div className="space-y-1">
                      <span className="block text-[9px] uppercase font-bold text-zinc-400">Payment Status</span>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => handleStatusChange(order.id, "paymentStatus", e.target.value)}
                        disabled={isUpdating}
                        className="px-2 py-1 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-[10px] font-bold"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="FAILED">FAILED</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Items and Shipping Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-left">
                  {/* Items */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[10px] uppercase text-zinc-400">Order Items</h4>
                    <div className="space-y-1.5">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center text-[11px]">
                          <span>
                            {item.product?.name} <span className="text-zinc-400 font-bold">x{item.quantity}</span>
                          </span>
                          <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Location details */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[10px] uppercase text-zinc-400">Billing Address</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 font-semibold">{order.address}</p>
                    <p className="text-zinc-500">Contact: {order.phone} | {order.email}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-mono">Method: {order.paymentMethod}</p>
                  </div>
                </div>

                {/* Footer and invoice downloads */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="font-black text-sm text-zinc-900 dark:text-white flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-600" /> Total final amount: Rs. {order.finalTotal?.toLocaleString()}
                  </div>

                  {order.pdfInvoiceUrl ? (
                    <a
                      href={`http://localhost:5000${order.pdfInvoiceUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-green-600 hover:text-white px-4 py-2 border rounded-xl font-bold text-zinc-600 dark:text-zinc-300 dark:bg-zinc-800 dark:hover:bg-green-700 transition"
                    >
                      <FileText className="w-3.5 h-3.5" /> Download PDF Invoice
                    </a>
                  ) : (
                    <span className="text-[10px] text-zinc-400 italic">No invoice PDF available</span>
                  )}
                </div>

              </div>
            ))}

            {/* Pagination controls */}
            {data.meta && data.meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[10px] font-bold disabled:opacity-50"
                >
                  &larr; Prev
                </button>
                <span className="text-[10px] text-zinc-500 font-semibold">
                  Page {page} of {data.meta.totalPages}
                </span>
                <button
                  disabled={page >= data.meta.totalPages}
                  onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
                  className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[10px] font-bold disabled:opacity-50"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
