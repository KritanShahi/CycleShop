import { useRouter } from "next/router";
import { products } from "../../src/data/products";
import Navbar from "../../src/components/Navbar";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find(p => p.id === Number(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} width={300} />
        <p>${product.price}</p>
        <p>{product.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
