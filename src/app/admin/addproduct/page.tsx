"use client";

import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Make sure the path is correct

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("price", form.price);
      formData.append("description", form.description);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      alert(`Product "${res.data.name}" added successfully!`);
      setForm({ name: "", type: "", price: "", description: "" });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
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
            Add New Product
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
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
