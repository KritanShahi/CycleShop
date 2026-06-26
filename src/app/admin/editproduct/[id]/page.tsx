"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams, useRouter } from "next/navigation";
import { useGetProductQuery, useUpdateProductMutation } from "@/store/productsApi";
import { getProductImage } from "@/utils/imageResolver";
import { useGetCategoriesQuery } from "@/store/categoriesApi";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? String(params.id) : "";

  // API Queries
  const { data: product, isLoading: loadingProduct } = useGetProductQuery(id);
  const { data: categories = [], isLoading: loadingCats } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: isSaving }] = useUpdateProductMutation();

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([]);

  // Populate state on load
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setType(product.type || "");
      setPrice(String(product.price || ""));
      setDescription(product.description || "");
      setStock(String(product.stock || "10"));
      setCategoryId(product.categoryId ? String(product.categoryId) : "");

      // Parse specs JSON to array
      if (product.specifications && typeof product.specifications === "object") {
        const specArr = Object.entries(product.specifications).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setSpecs(specArr);
      }
    }
  }, [product]);

  const handleAddSpecRow = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description || !categoryId) {
      alert("Please fill all required fields!");
      return;
    }

    // Convert specs array to object
    const specsObject: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim()) {
        specsObject[s.key] = s.value;
      }
    });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("categoryId", categoryId);
    formData.append("specifications", JSON.stringify(specsObject));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateProduct({ id, formData }).unwrap();
      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (err: any) {
      alert(err?.data?.error || "Failed to update product.");
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <Sidebar />

      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Link href="/admin/products" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="text-left">
            <h1 className="text-2xl font-black tracking-tight">Edit Product</h1>
            <p className="text-xs text-zinc-500 mt-1">Modify configurations for this cycle listing.</p>
          </div>
        </header>

        {/* Form Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl">
          {/* Main Info */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 font-bold uppercase">Product Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 font-bold uppercase">Bicycle Category Type *</label>
                <select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    const selected = categories.find((c) => String(c.id) === e.target.value);
                    if (selected) setType(selected.name);
                  }}
                  className="w-full px-3.5 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 font-bold uppercase">Legacy Type Label</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-500 font-bold uppercase">Description *</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl focus:outline-none"
                required
              />
            </div>

            {/* Technical specs */}
            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase text-zinc-400">Technical Specifications</h3>
                <button
                  type="button"
                  onClick={handleAddSpecRow}
                  className="text-xs text-green-600 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Row
                </button>
              </div>

              <div className="space-y-2">
                {specs.map((row, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={row.key}
                      onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                      className="w-1/3 px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                    />
                    <input
                      type="text"
                      value={row.value}
                      onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecRow(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing and upload */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase text-zinc-400">Pricing & Inventory</h3>
              
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 font-semibold">Retail Price (Rs.) *</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 font-semibold">Stock quantity *</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase text-zinc-400">Image Asset</h3>
              
              <div className="space-y-2">
                <div className="w-full aspect-video bg-zinc-50 dark:bg-zinc-950 border rounded-xl overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : getProductImage(product.imageUrl, product.type)}
                    alt="Thumbnail Preview"
                    className="object-contain w-full h-full"
                  />
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) setImageFile(files[0]);
                  }}
                  className="w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 file:hover:bg-green-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {isSaving ? "Saving changes..." : "Save Product Configurations"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
