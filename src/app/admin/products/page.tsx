"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    image: null as File | null,
  });

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data =>{  console.log("Fetched products:", data); setProducts(data)});
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) setForm(prev => ({ ...prev, [name]: files[0] }));
    else setForm(prev => ({ ...prev, [name]: value }));
  };

  // Add product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    const newProduct = await res.json();
    setProducts(prev => [...prev, newProduct]);
    setForm({ name: "", type: "", price: "", description: "", image: null });
  };

  // Delete product
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Products</h1>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Cycle Name"
            value={form.name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Mountain">Mountain</option>
            <option value="Road">Road</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Kids">Kids</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-2 border rounded col-span-1 md:col-span-2"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Add Product
        </button>
      </form>

      {/* Products List */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Existing Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
              )}
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{product.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{product.type}</p>
              <p className="text-gray-700 dark:text-gray-300">Rs. {product.price}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{product.description}</p>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-auto bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
