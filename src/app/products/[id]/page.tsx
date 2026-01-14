/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const { addToCart } = useCart(); // ✅ GLOBAL CART

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false); // ✅ Toast visibility

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(res.data);
      } catch (err: any) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${productId}/comments`
        );
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    if (productId) fetchComments();
  }, [productId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${productId}/comments`,
        { text: commentText }
      );
      setComments((prev) => [...prev, res.data]);
      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  // ✅ Add to cart + show toast
  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // hide toast after 3s
  };

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto relative">
      {/* Toast popup */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-slideIn">
          {product.name} (x{quantity}) added to cart!
        </div>
      )}

      {/* Image + Info */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={
            product.imageUrl
              ? `http://localhost:5000${product.imageUrl}`
              : "/placeholder.png"
          }
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded shadow"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p><strong>Type:</strong> {product.type}</p>
          <p className="text-xl font-semibold text-green-600">
            ${product.price}
          </p>
          <p className="text-gray-600">Free Shipping</p>

          <div className="flex items-center gap-4 mt-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />

            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p className="whitespace-pre-wrap text-gray-700">
          {product.description}
        </p>
      </div>

      {/* Comments */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
          className="w-full p-3 border rounded mb-2"
          placeholder="Add a comment..."
        />

        <button
          onClick={handleAddComment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Comment
        </button>

        <ul className="mt-4 space-y-2">
          {comments.map((c) => (
            <li key={c.id} className="p-3 border rounded bg-gray-50">
              <p className="whitespace-pre-wrap">{c.text}</p>
              <p className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Simple animation */}
      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
