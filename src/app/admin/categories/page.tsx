"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/store/categoriesApi";
import { Library, Trash2, Edit2, Plus, Save, X } from "lucide-react";

export default function AdminCategoriesPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // API Hooks
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await addCategory({ name, description }).unwrap();
      setName("");
      setDescription("");
      alert("Category created successfully!");
    } catch (err: any) {
      alert(err?.data?.error || "Failed to add category.");
    }
  };

  const handleEditClick = (cat: any) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description || "");
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editName.trim()) return;

    try {
      await updateCategory({ id: editingId, name: editName, description: editDescription }).unwrap();
      setEditingId(null);
      alert("Category updated successfully!");
    } catch (err: any) {
      alert(err?.data?.error || "Failed to update category.");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? It must be empty.")) return;

    try {
      await deleteCategory(id).unwrap();
      alert("Category deleted successfully!");
    } catch (err: any) {
      alert(err?.data?.error || "Failed to delete category.");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <Sidebar />

      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h1 className="text-2xl font-black tracking-tight">Manage Categories</h1>
          <p className="text-xs text-zinc-500 mt-1">Classify your cycle models and spare accessories.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Add / Edit Category Form */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4 self-start">
            {editingId ? (
              <form onSubmit={handleUpdateCategory} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <h3 className="font-bold text-xs uppercase text-zinc-400">Edit Category</h3>
                  <button type="button" onClick={() => setEditingId(null)} className="text-zinc-400 hover:text-zinc-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-semibold">Category Name *</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-semibold">Description</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3 rounded-xl shadow flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> Save Category
                </button>
              </form>
            ) : (
              <form onSubmit={handleAddCategory} className="space-y-4">
                <h3 className="font-bold text-xs uppercase text-zinc-400">Add New Category</h3>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-semibold">Category Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Offroad Mountain"
                    className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-semibold">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe target audience and parameters of this classification..."
                    className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAdding}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3 rounded-xl shadow flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" /> Create Category
                </button>
              </form>
            )}
          </div>

          {/* Right: Categories List Table */}
          <div className="lg:col-span-8 space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-white dark:bg-zinc-900 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <Library className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-500 text-xs">No categories added yet.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-zinc-100/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Category Name</th>
                      <th className="px-6 py-4">Slug</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20">
                        <td className="px-6 py-4 font-bold text-zinc-800 dark:text-zinc-200">{cat.name}</td>
                        <td className="px-6 py-4 font-mono text-[10px] text-zinc-500">{cat.slug}</td>
                        <td className="px-6 py-4 text-zinc-500 truncate max-w-[200px]">{cat.description || "—"}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditClick(cat)}
                              className="p-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-lg border border-yellow-200 transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              disabled={isDeleting}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
