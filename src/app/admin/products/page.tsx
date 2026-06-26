"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useGetProductsQuery, useDeleteProductMutation } from "@/store/productsApi";
import { useRouter } from "next/navigation";
import { Bike, Search, Plus, Edit2, Trash2 } from "lucide-react";
import { getProductImage } from "@/utils/imageResolver";

export default function AdminProductsPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  // API Hooks
  const { data, isLoading } = useGetProductsQuery({ q: q || undefined, page, limit: 10 });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully!");
    } catch (err: any) {
      alert(err?.data?.error || "Failed to delete product.");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <Sidebar />

      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="text-left">
            <h1 className="text-2xl font-black tracking-tight">Manage Products</h1>
            <p className="text-xs text-zinc-500 mt-1">Catalog editor dashboard for products and cycle listings.</p>
          </div>
          <button
            onClick={() => router.push("/admin/addproduct")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5 self-start"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </header>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search products by name, type, description..."
            className="w-full pl-9 pr-3 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-800 dark:text-zinc-200"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 animate-pulse" />
            ))}
          </div>
        ) : !data?.products || data.products.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
            <Bike className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 text-xs">No products currently found in the database.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Products Table/List */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-zinc-100/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Product Info</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {data.products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 rounded-lg overflow-hidden flex items-center justify-center p-0.5 flex-shrink-0">
                          <img
                            src={getProductImage(p.imageUrl, p.type)}
                            alt={p.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1">{p.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 px-2.5 py-0.5 rounded font-bold uppercase">
                          {p.category?.name || p.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-zinc-800 dark:text-zinc-200">
                        Rs. {p.price.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 font-semibold ${p.stock > 3 ? "text-zinc-500" : "text-red-500 font-bold"}`}>
                        {p.stock} units
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => router.push(`/admin/editproduct/${p.id}`)}
                            className="p-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-lg transition border border-yellow-200"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={isDeleting}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition border border-red-200"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
