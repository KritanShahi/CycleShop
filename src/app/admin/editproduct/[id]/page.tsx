"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      const p = res.data;
      setForm({
        name: p.name,
        type: p.type,
        price: p.price.toString(),
        description: p.description,
      });
      setPreview(p.imageUrl ? `http://localhost:5000${p.imageUrl}` : null);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch product");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("price", form.price);
      formData.append("description", form.description);
      if (image) formData.append("image", image);

      const res = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        formData
      );

      alert(`Product "${res.data.name}" updated successfully!`);
      router.push("/admin"); // redirect to admin dashboard
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Edit Product
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Cycle Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 border border-gray-600 rounded-lg w-full mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-3 border border-gray-600 rounded-lg w-full mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
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
            className="p-3 border border-gray-600 rounded-lg w-full mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-3 border border-gray-600 rounded-lg w-full mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            rows={4}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 text-white"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-52 object-cover rounded-lg mb-4 shadow-lg border border-gray-600"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:from-pink-600 hover:to-purple-700 transition shadow-lg"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
