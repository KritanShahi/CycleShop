"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAppSelector } from "@/store";
import { usePlaceOrderMutation } from "@/store/ordersApi";
import { useValidateCouponMutation } from "@/store/couponsApi";
import { CreditCard, ShoppingBag, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart = [], clearCart } = useCart();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  // Form State
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ESEWA">("COD");

  // Coupon State
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [activeCoupon, setActiveCoupon] = useState<{ code: string; discountType: string; value: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // API Mutations
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [validateCoupon, { isLoading: isValidatingCoupon }] = useValidateCouponMutation();

  // Redirect if cart is empty or not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please login to proceed to checkout!");
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === "PERCENT") {
      discountAmount = (subtotal * activeCoupon.value) / 100;
    } else {
      discountAmount = activeCoupon.value;
    }
  }
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponCodeInput.trim()) return;

    try {
      const res = await validateCoupon({ code: couponCodeInput }).unwrap();
      setActiveCoupon(res.coupon);
      setCouponCodeInput("");
      alert(`Coupon '${res.coupon.code}' applied successfully!`);
    } catch (err: any) {
      setCouponError(err?.data?.error || "Invalid coupon code.");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill all contact and shipping fields!");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const payload = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: subtotal,
      discount: discountAmount,
      finalTotal,
      couponCode: activeCoupon?.code || undefined,
      paymentMethod,
      address,
      phone,
      email,
    };

    try {
      const res = await placeOrder(payload).unwrap();
      
      // If Cash on Delivery, order is confirmed immediately
      if (paymentMethod === "COD") {
        clearCart();
        // Redirect to order status page or dashboard
        alert("Order placed successfully via Cash on Delivery!");
        router.push("/account");
      } 
      
      // If eSewa, submit the signed form payload to eSewa sandbox portal
      else if (paymentMethod === "ESEWA" && res.esewaConfig) {
        // Auto-create and submit form to eSewa sandbox endpoint
        const esewaForm = document.createElement("form");
        esewaForm.setAttribute("method", "POST");
        esewaForm.setAttribute("action", "https://rc-epay.esewa.com.np/api/epay/main/v2");

        Object.entries(res.esewaConfig).forEach(([key, val]) => {
          const inputField = document.createElement("input");
          inputField.setAttribute("type", "hidden");
          inputField.setAttribute("name", key);
          inputField.setAttribute("value", String(val));
          esewaForm.appendChild(inputField);
        });

        document.body.appendChild(esewaForm);
        esewaForm.submit();
      }
    } catch (err: any) {
      alert(err?.data?.error || "Order placement failed. Check stock availability.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <h3 className="font-bold text-lg">Your cart is empty</h3>
        <Link href="/products" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full text-xs font-bold shadow">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-6 max-w-7xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Checkout Order</h1>
        <p className="text-sm text-zinc-500 mt-1">Complete your delivery and payment details below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-6">
          
          {/* Shipping/Contact Details */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm uppercase text-zinc-400">Shipping Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 font-semibold">Contact Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-800 dark:text-zinc-200"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., 98XXXXXXXX"
                  className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-800 dark:text-zinc-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-500 font-semibold">Delivery Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, city, district (e.g., Kathmandu, Gyaneshwor)"
                className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-800 dark:text-zinc-200"
                required
              />
            </div>
          </div>

          {/* Payment Method Option */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm uppercase text-zinc-400">Payment Option</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cash On Delivery */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "COD"
                    ? "border-green-600 bg-green-50/50 dark:bg-green-950/20"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <div>
                  <h4 className="font-bold text-xs">Cash on Delivery</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Pay with cash upon cycle receipt</p>
                </div>
              </label>

              {/* eSewa Nepal */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "ESEWA"
                    ? "border-green-600 bg-green-50/50 dark:bg-green-950/20"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "ESEWA"}
                  onChange={() => setPaymentMethod("ESEWA")}
                  className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-xs flex items-center justify-between">
                    eSewa Wallet <span className="text-[9px] bg-green-600 text-white px-1.5 py-0.5 rounded uppercase">Instant</span>
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Pay securely via eSewa digital wallet</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPlacingOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isPlacingOrder ? "Processing Order..." : "Confirm & Place Order"}
          </button>
        </form>

        {/* Right: Cart Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          {/* Basket list summary */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm uppercase text-zinc-400">Order Summary</h3>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between py-2 text-xs">
                  <div>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.name}</span>
                    <span className="text-[10px] text-zinc-400 block">Quantity: {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-zinc-600 dark:text-zinc-400">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coupon discount form */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm uppercase text-zinc-400 flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-green-600" /> Apply Coupon
            </h3>

            {couponError && <p className="text-xs text-red-500 font-bold">{couponError}</p>}

            {activeCoupon ? (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 rounded-xl flex items-center justify-between text-xs text-green-700 dark:text-green-300">
                <div>
                  <span className="font-bold">Coupon Applied:</span> {activeCoupon.code}
                  <span className="block text-[10px] text-zinc-500">
                    Discount: {activeCoupon.discountType === "PERCENT" ? `${activeCoupon.value}%` : `Rs. ${activeCoupon.value}`} off
                  </span>
                </div>
                <button
                  onClick={() => setActiveCoupon(null)}
                  className="font-bold text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  placeholder="Enter Code (e.g. BIKER10)"
                  className="flex-1 px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isValidatingCoupon}
                  className="bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs px-4 py-2 rounded-xl hover:bg-zinc-800 transition"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Pricing Calculations */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm uppercase text-zinc-400">Checkout Price</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Items Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-500">
                <span>Shipping & Handing</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between font-black text-sm text-zinc-900 dark:text-white">
                <span>Total Amount Due</span>
                <span>Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Fully secure SSL checkout gateway
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
