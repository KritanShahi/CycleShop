"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

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
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
      } catch (err: any) {
        console.error("Error fetching product:", err.response?.data || err.message);
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
        const res = await axios.get(`http://localhost:5000/api/products/${productId}/comments`);
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
      const res = await axios.post(`http://localhost:5000/api/products/${productId}/comments`, {
        text: commentText,
      });
      setComments((prev) => [...prev, res.data]);
      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    setCart((prev) => [...prev, { product, quantity }]);
    alert(`${product.name} (x${quantity}) added to cart!`);
  };

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Top section: Image + product info */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Image */}
        <img
          src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "/placeholder.png"}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded shadow"
        />

        {/* Product info */}
        <div className="flex-1 flex flex-col justify-start space-y-4">
          {/* Name, Type, Price, Shipping (vertical) */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg"><span className="font-semibold">Type:</span> {product.type}</p>
            <p className="text-lg font-semibold"><span className="font-semibold">Price:</span> ${product.price}</p>
            <p className="text-lg text-gray-600"><span className="font-semibold">Shipping:</span> Free Shipping</p>
          </div>

          {/* Quantity + Add to Cart side by side */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="font-semibold">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 p-2 border rounded focus:outline-none focus:ring focus:border-green-300"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="mb-4">
          <textarea
            placeholder="Add a comment..."
            className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring focus:border-green-300"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Comment
          </button>
        </div>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((c) => (
              <li key={c.id} className="p-3 border rounded bg-gray-50 dark:bg-gray-800">
                <p className="whitespace-pre-wrap">{c.text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
