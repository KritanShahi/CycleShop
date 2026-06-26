/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getProductImage } from "@/utils/imageResolver";

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const productArray = res.data.products || res.data;
        const finalArray = Array.isArray(productArray) ? productArray : [];
        setProducts(finalArray);
        setFilteredProducts(finalArray);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (search.trim()) {
      const lower = search.toLowerCase();
      updated = updated.filter(
        (p) => p.name.toLowerCase().includes(lower) || p.type.toLowerCase().includes(lower)
      );
    }

    if (filterType !== "All") updated = updated.filter((p) => p.type === filterType);
    if (minPrice !== "") updated = updated.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") updated = updated.filter((p) => p.price <= Number(maxPrice));

    setFilteredProducts(updated);
  }, [search, filterType, minPrice, maxPrice, products]);

  const types = ["All", ...Array.from(new Set(products.map((p) => p.type)))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">BICYCLES</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar: Search & Filters */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md sticky top-6 h-fit">
          <h2 className="text-2xl font-semibold mb-4">Filters</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search by name or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 placeholder-gray-500"
            />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg w-1/2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 placeholder-gray-500"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg w-1/2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg col-span-full">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition cursor-pointer transform hover:-translate-y-1">
                  <img
                    src={getProductImage(product.imageUrl, product.type)}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                      <span className="text-sm font-medium text-purple-600">{product.type}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
                    <div className="text-xl font-bold text-pink-600">Rs. {product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
