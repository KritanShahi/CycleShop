"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string; // maps to backend "type"
  image: string;    // maps to backend "imageUrl"
  description: string; // added description
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      const mappedProducts = res.data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.type,
        image: p.imageUrl ? `http://localhost:5000${p.imageUrl}` : "/placeholder.png",
        description: p.description || "",
      }));

      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      setFilteredProducts(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/editproduct/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1">
        <header className="bg-green-600 text-white p-4 md:ml-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <button
            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-50 transition"
            onClick={() => router.push("/admin/addproduct")}
          >
            + Add Product
          </button>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          {/* Search bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, category, or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-green-300"
            />
          </div>

          {loading ? (
            <p className="text-gray-700 dark:text-gray-300">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition flex flex-col"
                >
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-t"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Category: {product.category}
                      </p>
                      {/* ✅ preserve line breaks in description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-wrap">
                        {product.description}
                      </p>
                      <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex mt-4 space-x-2">
                      <button
                        className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
