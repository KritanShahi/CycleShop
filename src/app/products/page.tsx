"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetProductsQuery } from "@/store/productsApi";
import { useGetCategoriesQuery } from "@/store/categoriesApi";
import { useCart } from "@/context/CartContext";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleWishlist } from "@/store/wishlistSlice";
import { Heart, Search, SlidersHorizontal, Eye, ShoppingCart } from "lucide-react";
import { getProductImage } from "@/utils/imageResolver";

function ProductsContent() {
  const searchParams = useSearchParams();
  
  // Filters State
  const [q, setQ] = useState(searchParams?.get("q") || "");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const { addToCart } = useCart();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  // Synchronize search query parameter
  useEffect(() => {
    const query = searchParams?.get("q");
    if (query !== null) {
      setQ(query || "");
    }
  }, [searchParams]);

  // API Queries
  const { data, isLoading, isFetching } = useGetProductsQuery({
    q: q || undefined,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    order,
    page,
    limit: 8,
  });

  const { data: categories = [], isLoading: loadingCats } = useGetCategoriesQuery();

  const handleResetFilters = () => {
    setQ("");
    setCategoryId(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-6 max-w-7xl mx-auto font-sans">
      
      {/* Title / Description */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Cycle Catalog</h1>
        <p className="text-sm text-zinc-500 mt-2">Explore Kathmandu's finest range of off-road and city street bicycles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm self-start">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-green-600" /> Filters
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-green-600 hover:text-green-700 hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Search bar */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-400">Search Keyword</label>
            <div className="relative">
              <input
                type="text"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, description..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-800 dark:text-zinc-200"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Categories select */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-400">Category</label>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCategoryId(undefined);
                  setPage(1);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                  categoryId === undefined
                    ? "bg-green-100 dark:bg-green-950 text-green-750 dark:text-green-300 font-semibold"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                All Categories
              </button>
              {loadingCats ? (
                <div className="h-10 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded" />
              ) : (
                categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoryId(cat.id);
                      setPage(1);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                      categoryId === cat.id
                        ? "bg-green-100 dark:bg-green-950 text-green-750 dark:text-green-300 font-semibold"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-400">Price range ($)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice || ""}
                onChange={(e) => {
                  setMinPrice(e.target.value ? Number(e.target.value) : undefined);
                  setPage(1);
                }}
                placeholder="Min"
                className="w-full px-2 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-center"
              />
              <input
                type="number"
                value={maxPrice || ""}
                onChange={(e) => {
                  setMaxPrice(e.target.value ? Number(e.target.value) : undefined);
                  setPage(1);
                }}
                placeholder="Max"
                className="w-full px-2 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-center"
              />
            </div>
          </div>
        </aside>

        {/* Catalog Main Grid */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Sorting / Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-xs text-zinc-500">
              Showing {data?.products?.length || 0} of {data?.meta?.total || 0} products
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold rounded-lg"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg focus:outline-none"
              >
                <option value="createdAt">Newest Arrival</option>
                <option value="price">Price</option>
                <option value="name">Product Name</option>
              </select>

              <select
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg focus:outline-none"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters view */}
          {showFiltersMobile && (
            <div className="lg:hidden p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-4 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <h4 className="font-bold text-xs">Mobile Filters</h4>
                <button onClick={handleResetFilters} className="text-[10px] text-green-600">Reset</button>
              </div>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 border rounded-lg text-xs bg-zinc-50 dark:bg-zinc-950"
              />
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-zinc-400">Category</p>
                <select
                  value={categoryId || ""}
                  onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full p-2 border rounded-lg text-xs bg-white dark:bg-zinc-800"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Catalog Listing */}
          {isLoading || isFetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-4 animate-pulse h-96 flex flex-col">
                  <div className="bg-zinc-200 dark:bg-zinc-700 h-44 w-full rounded-xl" />
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-700 w-3/4 rounded" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 w-1/2 rounded" />
                  <div className="h-10 bg-zinc-200 dark:bg-zinc-700 w-full rounded mt-auto" />
                </div>
              ))}
            </div>
          ) : !data?.products || data.products.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">No Bicycles Found</h3>
              <p className="text-zinc-500 text-xs mt-1">Try relaxing your search terms or price filter boundaries.</p>
              <button
                onClick={handleResetFilters}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow"
              >
                Clear Search filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.products.map((p) => {
                const isWishlisted = wishlistItems.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-44 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-2">
                      <img
                        src={getProductImage(p.imageUrl, p.type)}
                        alt={p.name}
                        className="object-cover h-full w-full rounded-xl transform group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      <button
                        onClick={() => dispatch(toggleWishlist(p.id))}
                        className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full shadow hover:bg-white dark:hover:bg-black transition hover:scale-105"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-500 dark:text-zinc-400"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[9px] bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-2 py-0.5 rounded font-semibold uppercase">
                            {p.category?.name || p.type}
                          </span>
                          <span className={`text-[9px] font-bold ${p.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                            {p.stock > 0 ? `In Stock (${p.stock})` : "Out of stock"}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm tracking-tight line-clamp-1 group-hover:text-green-600 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 min-h-[32px]">
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <span className="font-extrabold text-base text-zinc-900 dark:text-white">
                          Rs. {p.price.toLocaleString()}
                        </span>
                        
                        <div className="flex gap-1.5">
                          <Link
                            href={`/products/${p.id}`}
                            className="p-2 bg-zinc-100 text-zinc-600 hover:bg-green-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-green-600 dark:hover:text-white rounded-xl border border-zinc-200 dark:border-zinc-700 transition"
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
                            disabled={p.stock <= 0}
                            className={`p-2 bg-green-600 text-white hover:bg-green-700 rounded-xl transition ${
                              p.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {data?.meta && data.meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &larr; Prev
              </button>
              
              {[...Array(data.meta.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    page === i + 1
                      ? "bg-green-600 text-white"
                      : "border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page >= data.meta.totalPages}
                onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
                className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center dark:bg-zinc-950">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
