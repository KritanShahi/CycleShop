"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/productsApi";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useCart } from "@/context/CartContext";
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Eye } from "lucide-react";
import mountainbike from "../images/mountainbike.jpg";
import roadBike from "../images/roadbike.jpg";
import hybridBike from "../images/hybridbike.webp";
import kidsBike from "../images/kidsbike.jpg";
import { getProductImage } from "@/utils/imageResolver";

export default function Home() {
  const { data, isLoading } = useGetProductsQuery({ limit: 4 });
  const { cart, addToCart } = useCart();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const categories = [
    { name: "Mountain", slug: "mountain", img: mountainbike, desc: "Built for rugged trails and heights" },
    { name: "Road", slug: "road", img: roadBike, desc: "Engineered for pure speed and distance" },
    { name: "Hybrid", slug: "hybrid", img: hybridBike, desc: "The perfect fusion of street and trail" },
    { name: "Kids", slug: "kids", img: kidsBike, desc: "Safe, stable, and fun learn-to-ride builds" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-700 py-24 sm:py-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 space-y-6 text-center md:text-left">
            <span className="inline-block bg-white/20 backdrop-blur-md text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/10 uppercase tracking-widest text-emerald-100">
              Est. 2050 B.S. | Kathmandu, Ason
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none drop-shadow-sm">
              Discover Your <br />
              <span className="text-emerald-300">Perfect Ride</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-50/90 max-w-xl">
              From high-performance mountain crawlers to daily city hybrids, we provide genuine cycles and accessories at Nepal’s most competitive prices.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="bg-white text-emerald-800 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-emerald-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Shop Collection
              </Link>
              <a
                href="#legacy"
                className="bg-transparent border border-white/40 hover:border-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
              >
                Our Legacy
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-md w-full relative h-[300px] sm:h-[380px] bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group">
            <Image
              src={hybridBike}
              alt="Featured Hybrid Cycle"
              className="object-contain w-full h-full transform hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs">
              <p className="font-semibold text-emerald-300">Oxford City Ride 2026</p>
              <p className="text-gray-300 text-[10px]">Alloy Frame | 21 Shimano Gears | Lightweight</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="py-8 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Truck className="w-10 h-10 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Free Valley Shipping</h4>
              <p className="text-xs text-zinc-500">Free courier inside Kathmandu Valley</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Genuine Spare Parts</h4>
              <p className="text-xs text-zinc-500">100% authentic Shimano parts & frames</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <RotateCcw className="w-10 h-10 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm">One-Year Warranty</h4>
              <p className="text-xs text-zinc-500">Complete peace of mind frame coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Carousel Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight">Explore Categories</h2>
          <p className="text-sm text-zinc-500 mt-2">Find the specific type of bicycle matched for your riding style.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products?q=${c.name}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-zinc-200 dark:border-zinc-800"
            >
              <Image
                src={c.img}
                alt={c.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 space-y-1 text-white">
                <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">{c.name}</h3>
                <p className="text-[11px] text-gray-300 leading-snug">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dynamic Featured Products (with RTK query support and skeleton fallback) */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Featured Collections</h2>
              <p className="text-sm text-zinc-500 mt-1">Our customer-favorite models and recently stocked cycles.</p>
            </div>
            <Link
              href="/products"
              className="text-sm font-bold text-green-600 hover:text-green-700 hover:underline flex items-center gap-1.5"
            >
              View All Products &rarr;
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow animate-pulse h-96 flex flex-col p-4 space-y-4">
                  <div className="bg-zinc-200 dark:bg-zinc-700 h-48 w-full rounded-lg" />
                  <div className="bg-zinc-200 dark:bg-zinc-700 h-6 w-3/4 rounded" />
                  <div className="bg-zinc-200 dark:bg-zinc-700 h-4 w-1/2 rounded" />
                  <div className="bg-zinc-200 dark:bg-zinc-700 h-10 w-full rounded mt-auto" />
                </div>
              ))}
            </div>
          ) : !data?.products || data.products.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 text-sm">No products currently listed. Visit Admin panel to add cycles!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.products.map((p) => {
                const isWishlisted = wishlistItems.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="group bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow hover:shadow-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-48 bg-zinc-100 dark:bg-zinc-900 group-overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={getProductImage(p.imageUrl, p.type)}
                        alt={p.name}
                        className="object-cover h-full w-full rounded-t transform group-hover:scale-102 transition-transform duration-300"
                      />
                      {/* Wishlist toggle */}
                      <button
                        onClick={() => dispatch(toggleWishlist(p.id))}
                        className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full shadow hover:bg-white dark:hover:bg-black hover:scale-105 transition"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-600 dark:text-zinc-300"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[10px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-2 py-0.5 rounded font-medium">
                            {p.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm tracking-tight line-clamp-1 group-hover:text-green-600 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2 min-h-[32px]">
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <span className="font-bold text-base text-zinc-900 dark:text-white">
                          Rs. {p.price.toLocaleString()}
                        </span>
                        <div className="flex gap-2">
                          <Link
                            href={`/products/${p.id}`}
                            className="p-2 bg-zinc-100 text-zinc-600 hover:bg-green-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-green-600 dark:hover:text-white rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
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
                            className="bg-green-600 text-white font-bold text-xs px-3.5 py-2 rounded-lg hover:bg-green-750 transition"
                          >
                            Add +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Promos / Coupons Banner */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-black rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-zinc-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(22,163,74,0.15),transparent)] pointer-events-none" />
          <div className="space-y-4 max-w-xl text-center md:text-left text-white">
            <span className="inline-block bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-semibold tracking-widest px-3 py-1 rounded-full uppercase">
              Special Monsoon Offer
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight">Get 10% Discount Today!</h3>
            <p className="text-sm text-gray-300">
              Apply the special checkout discount coupon code below and claim an instant 10% discount on any bike in our catalog.
            </p>
            <div className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl text-sm font-mono text-green-400 font-bold select-all">
              BIKER10
            </div>
          </div>
          <div className="flex-shrink-0 text-center md:text-right">
            <Link
              href="/products"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Redeem Discount Now
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy and History Section */}
      <section id="legacy" className="py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">Over 30 Years of Cycling Legacy</h2>
            <div className="w-16 h-1 bg-green-600 rounded" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Nestled in the historic and bustling hub of Kathmandu at Ason, Kritan Cycle Shop has been providing genuine, reliable cycles and spare parts since 2050 B.S. What began as a local workshop has grown to represent decades of trust for generations of riders.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our cycles are built with durability, lightweight frames, and genuine components. Whether you are searching for high-performance offroad gears or teaching your children how to balance, our experienced technicians hand-assemble every bicycle to guarantee safety and a smooth ride.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <span className="block text-3xl font-extrabold text-green-600 dark:text-green-400">30K+</span>
                <span className="text-xs text-zinc-500">Cycles Sold</span>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <span className="block text-3xl font-extrabold text-green-600 dark:text-green-400">100%</span>
                <span className="text-xs text-zinc-500">Customer Support</span>
              </div>
            </div>
          </div>

          <div className="relative h-[350px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-300 dark:border-zinc-700">
            <Image
              src={roadBike}
              alt="Store Front Bicycle Shop"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
