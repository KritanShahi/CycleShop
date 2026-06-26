"use client";

import React from "react";
import Link from "next/link";
import { useGetProductsQuery } from "@/store/productsApi";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react";
import { getProductImage } from "@/utils/imageResolver";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector((state) => state.wishlist.items);
  const { addToCart } = useCart();

  // Load all products to filter wishlisted ones
  const { data, isLoading } = useGetProductsQuery({ limit: 100 });

  const wishlistedProducts = data?.products.filter((p) => wishlistIds.includes(p.id)) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-6 max-w-7xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Your Wishlist</h1>
        <p className="text-sm text-zinc-500 mt-1">Keep track of the bicycle models you love.</p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <Heart className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="font-bold text-lg">Wishlist is empty</h3>
          <p className="text-zinc-500 text-xs mt-1">Browse our cycle shop and click the heart icon on any model.</p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow"
          >
            Explore Bicycles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 p-4 flex gap-4 items-center relative"
            >
              {/* Product image */}
              <div className="relative w-24 h-24 bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                <img
                  src={getProductImage(p.imageUrl, p.type)}
                  alt={p.name}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{p.name}</h3>
                <p className="text-xs text-green-600 font-bold">Rs. {p.price.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-400 capitalize">{p.type} Cycle</p>

                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/products/${p.id}`}
                    className="p-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      addToCart({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        imageUrl: p.imageUrl,
                        quantity: 1,
                      });
                    }}
                    className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => dispatch(toggleWishlist(p.id))}
                    className="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 rounded-lg transition"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
