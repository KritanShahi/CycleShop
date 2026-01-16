"use client";

import Link from "next/link";
import { Product } from "../../types";
import Image from "next/image";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
<div className="border rounded overflow-hidden shadow m-2 w-full">

      {/* Image container */}
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill // Makes the image fill the parent div
          className="object-cover"
        />
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>${product.price}</p>
        <Link href={`/products/${product.id}`} className="text-blue-500">
          View Details
        </Link>
      </div>
    </div>
  );
}
