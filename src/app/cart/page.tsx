/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart = [], addToCart, removeFromCart } = useCart(); // global cart

  // calculate total cart price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDecrease = (id: number) => {
    // if quantity is 1, remove item
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity <= 1) {
      removeFromCart(id);
    } else {
      // decrease quantity by one
      addToCart({ ...item, quantity: -1 });
    }
  };

  const handleIncrease = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center bg-white p-4 rounded shadow"
              >
                {/* Product image */}
                <div className="col-span-2">
                  <img
                    src={
                      item.imageUrl
                        ? `http://localhost:5000${item.imageUrl}`
                        : "/placeholder.png"
                    }
                    alt={item.name}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>

                {/* Product name */}
                <div className="col-span-3 ml-4">
                  <h2 className="font-semibold text-black">{item.name}</h2>
                  <p className="text-sm text-black">${item.price}</p>
                </div>

                {/* Quantity controls */}
                <div className="col-span-4 flex items-center space-x-2 justify-center">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-black text-lg"
                  >
                    –
                  </button>

                  <p className="px-3 py-1 bg-gray-100 rounded text-center w-12 text-black">
                    {item.quantity}
                  </p>

                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-black text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Item total price */}
                <div className="col-span-2 text-right font-semibold text-black">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>

                {/* Remove button */}
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart total */}
          <div className="mt-6 text-right text-xl font-bold text-black">
            Total: ${total.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}
