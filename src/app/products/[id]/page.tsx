"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetProductQuery, useAddReviewMutation, useGetProductsQuery } from "@/store/productsApi";
import { useCart } from "@/context/CartContext";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleWishlist } from "@/store/wishlistSlice";
import { Star, Heart, ArrowLeft, Shield, Sparkles, MessageCirclePlus, HelpCircle } from "lucide-react";
import Link from "next/link";
import { getProductImage } from "@/utils/imageResolver";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id ? String(params.id) : "";
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Review submission state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState<string | null>(null);

  // API Hooks
  const { data: product, isLoading, isError } = useGetProductQuery(productId);
  const [submitReview, { isLoading: isSubmitting }] = useAddReviewMutation();
  
  // Related recommendations query (filter by same type)
  const { data: relatedData } = useGetProductsQuery(
    { limit: 4, categoryId: product?.categoryId || undefined },
    { skip: !product }
  );

  const isWishlisted = wishlistItems.includes(Number(productId));

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });

    setToastMessage(`${product.name} (x${quantity}) added to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);
    
    if (!isAuthenticated) {
      alert("Please login first to submit a review!");
      router.push("/login");
      return;
    }

    if (!comment.trim()) {
      setReviewError("Please write a review comment.");
      return;
    }

    try {
      await submitReview({ productId, rating, comment }).unwrap();
      setComment("");
      setRating(5);
      alert("Review submitted successfully!");
    } catch (err: any) {
      setReviewError(err?.data?.error || "Failed to submit review.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-500">Loading cycle details...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <h3 className="font-bold text-lg">Product Not Found</h3>
        <p className="text-xs text-zinc-500 mt-1">This cycle model does not exist or has been removed.</p>
        <Link href="/products" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full text-xs font-bold">
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Calculate average rating
  const reviewsCount = product.reviews?.length || 0;
  const averageRating = reviewsCount > 0
    ? (product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewsCount).toFixed(1)
    : "No ratings";

  // Check specs
  const specifications = product.specifications || {
    Frame: "6061 Aluminum Alloy",
    Gears: "21-Speed Shimano Tourney",
    Brakes: "Dual Mechanical Disc Brakes",
    Weight: "14.8 kg",
    Warranty: "1 Year Frame Warranty",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 px-6 max-w-7xl mx-auto font-sans relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-6 py-3.5 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-right-5 text-sm font-semibold">
          {toastMessage}
        </div>
      )}

      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-green-600 font-semibold mb-6 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-video lg:aspect-square bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center p-4">
            <img
              src={getProductImage(product.imageUrl, product.type)}
              alt={product.name}
              className="object-contain w-full h-full max-h-[480px] rounded-2xl"
            />
            {/* Wishlist floating toggle */}
            <button
              onClick={() => dispatch(toggleWishlist(product.id))}
              className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full shadow hover:bg-white dark:hover:bg-black transition-all hover:scale-110"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-500 dark:text-zinc-400"}`} />
            </button>
          </div>
        </div>

        {/* Right: Info & CTA */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {product.category?.name || product.type}
              </span>
              <div className="flex items-center text-yellow-500 text-xs gap-1 font-semibold">
                <Star className="w-3.5 h-3.5 fill-yellow-500" /> {averageRating} ({reviewsCount} reviews)
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-xl font-black text-green-600 dark:text-green-400">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-b border-zinc-100 dark:border-zinc-800 py-4">
            {product.description}
          </div>

          {/* Checkout Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-sm font-bold"
                >
                  &ndash;
                </button>
                <span className="px-4 py-2 text-sm font-bold text-center w-12">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 ${
                  product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {product.stock > 0 ? "Add to Shopping Cart" : "Out of stock"}
              </button>
            </div>

            <p className={`text-xs ${product.stock > 3 ? "text-zinc-500" : "text-amber-600 font-bold"}`}>
              {product.stock > 0 ? `Stock Availability: ${product.stock} units left` : "Out of stock - Check back later"}
            </p>
          </div>

          {/* Warranty / Security Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Full warranty frame validation</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>100% Genuine brand parts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
        
        {/* Left: Technical specifications */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-bold">Technical Specifications</h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <tbody>
                {Object.entries(specifications).map(([key, val]) => (
                  <tr key={key} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    <td className="px-4 py-3.5 bg-zinc-100/50 dark:bg-zinc-950/50 font-bold text-zinc-500 uppercase tracking-wider w-1/3">
                      {key}
                    </td>
                    <td className="px-4 py-3.5 text-zinc-700 dark:text-zinc-300 font-medium">
                      {String(val)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Reviews section */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Ratings & Reviews ({reviewsCount})
          </h2>

          {/* Submit review form */}
          <form
            onSubmit={handleReviewSubmit}
            className="p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-sm"
          >
            <h3 className="font-bold text-xs uppercase text-zinc-400 flex items-center gap-1.5">
              <MessageCirclePlus className="w-4 h-4 text-green-600" /> Leave a Review
            </h3>

            {reviewError && <p className="text-xs text-red-500 font-bold">{reviewError}</p>}

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-semibold">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-0.5 hover:scale-110 transition focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-300 dark:text-zinc-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other riders what you like or dislike about this cycle model..."
              className="w-full p-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-800 dark:text-zinc-200"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-750 text-white font-bold text-xs px-5 py-2.5 rounded-full transition shadow disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          {/* Reviews list */}
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {!product.reviews || product.reviews.length === 0 ? (
              <p className="text-zinc-500 text-xs">No reviews listed yet. Be the first to share your experience!</p>
            ) : (
              product.reviews.map((r: any) => (
                <div
                  key={r.id}
                  className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{r.user?.name}</span>
                    <span className="text-[10px] text-zinc-400">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex text-yellow-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < r.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-200 dark:text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-605 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {r.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recommended related products */}
      {relatedData?.products && relatedData.products.length > 1 && (
        <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-extrabold tracking-tight mb-8">Related Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedData.products
              .filter((p) => p.id !== Number(productId))
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="h-36 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-2">
                    <img
                      src={getProductImage(p.imageUrl, p.type)}
                      alt={p.name}
                      className="object-contain h-full w-full rounded-xl"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs tracking-tight line-clamp-1 group-hover:text-green-600 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-[10px] text-green-600 font-semibold mt-1">
                        Rs. {p.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
