"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { getProductImage } from "@/utils/imageResolver";

export default function CartPage() {
  const { cart = [], addToCart, removeFromCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDecrease = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity <= 1) {
      removeFromCart(id);
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  const handleIncrease = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-6 max-w-7xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Shopping Cart</h1>
        <p className="text-sm text-zinc-500 mt-1">Review the cycle models and parts in your basket.</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="font-bold text-lg">Your shopping cart is empty</h3>
          <p className="text-zinc-500 text-xs mt-1">Fill it up with Nepals best mountain, road, or kids bicycles!</p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow"
          >
            Explore Bicycles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart list items */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
              >
                {/* Image and name */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-zinc-200">
                    <img
                      src={getProductImage(item.imageUrl, item.name)}
                      alt={item.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-zinc-400 font-semibold">Rs. {item.price.toLocaleString()} each</p>
                  </div>
                </div>

                {/* Controls and calculations */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-xs font-bold">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                      &ndash;
                    </button>
                    <span className="px-3 py-1.5 w-10 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 py-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>

                  {/* Item subtotal */}
                  <div className="font-extrabold text-sm text-zinc-900 dark:text-white w-20 text-right">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 rounded-lg transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 self-start bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <h2 className="font-bold text-lg">Basket Summary</h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-300">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500">
                <span>Shipping Fee</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-400 text-green-600">FREE</span>
              </div>
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between font-black text-sm text-zinc-900 dark:text-white">
                <span>Total Amount</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
