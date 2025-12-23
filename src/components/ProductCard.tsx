"use client"; // Important

import Link from "next/link";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border p-4 m-2 w-52">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>${product.price}</p>
      <Link href={`/products/${product.id}`} className="text-blue-500">
        View Details
      </Link>
    </div>
  );
}
