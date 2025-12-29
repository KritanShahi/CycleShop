import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Image from "next/image";
import mountainbike from "../images/mountainbike.jpg"
import roadBike from '../images/roadbike.jpg';
import hybridBike from '../images/hybridbike.webp';
import kidsBike from '../images/kidsbike.jpg';


// Map each bike type to its hero image and description
const bikeSections = [
  {
    type: "Mountain",
    title: "Mountain Bikes",
    description:
      "Explore our collection of high-quality mountain bikes designed for adventure and durability. Perfect for trails, hills, and rugged terrains.",
    image: mountainbike,
  },
  {
    type: "Road",
    title: "Road Bikes",
    description:
      "Lightweight and fast road bikes for smooth city rides or long-distance racing. Ideal for performance and speed.",
    image: roadBike,
  },
  {
    type: "Hybrid",
    title: "Hybrid Bikes",
    description:
      "A perfect mix of comfort and performance. Hybrid bikes are ideal for casual city rides and light trails.",
    image: hybridBike,
  },
  {
    type: "Kids",
    title: "Kids Bikes",
    description:
      "Safe and fun bikes for children of all ages. Designed for comfort and stability while learning to ride.",
    image: kidsBike,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">

  
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Kritan Cycle Shop</h1>
        <p className="text-lg mb-8 max-w-xl">
          Located in Kathmandu, Ason. Trusted cycles for all ages and genuine parts at affordable prices.
        </p>
        <a
          href="#explore"
          className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Explore the Cycle Shop
        </a>
      </section>

      {/* About Section */}
  
<section className="max-w-5xl mx-auto py-16 px-4">
  {/* Store Introduction */}
  <h2 className="text-3xl font-bold mb-6">Welcome to Kritan Cycle Shop</h2>
  <p className="mb-4 text-gray-700 dark:text-gray-300">
    Nestled in the heart of Kathmandu, Ason, Kritan Cycle Shop has been providing top-quality bicycles and parts since 2050 B.S. Our mission is to make cycling accessible, safe, and enjoyable for riders of all ages.
  </p>

  {/* Our Legacy */}
  <h3 className="text-2xl font-semibold mt-6 mb-3">Our Legacy</h3>
  <p className="mb-4 text-gray-700 dark:text-gray-300">
    With over 30 years of experience, we have built a reputation for reliability and trust. Generations of cyclists have relied on us for quality products, expert advice, and unmatched service.
  </p>

  {/* Quality and Innovszzation */}
  <h3 className="text-2xl font-semibold mt-6 mb-3">Quality and Innovation</h3>
  <p className="mb-4 text-gray-700 dark:text-gray-300">
    Our cycles are designed with precision engineering and lightweight frames, ensuring smooth rides, better performance, and durability. We carefully select components to meet the highest standards.
  </p>

  {/* Genuine Parts & Accessories */}
  <h3 className="text-2xl font-semibold mt-6 mb-3">Genuine Parts & Accessories</h3>
  <p className="mb-4 text-gray-700 dark:text-gray-300">
    Maintain your bike with confidence using our range of authentic parts and accessories. All products are selected for their reliability, longevity, and affordability.
  </p>

  {/* Our Collection */}
  <h3 className="text-2xl font-semibold mt-6 mb-3">Our Collection</h3>
  <p className="mb-4 text-gray-700 dark:text-gray-300">
    From beginner bikes to professional models, we offer a wide variety for all ages. Explore brands like Everest, City, Oxford, Talon, and more. Whether for city rides, trails, or family adventures, we have the perfect cycle for you.
  </p>

  {/* Customer Commitment */}
  <h3 className="text-2xl font-semibold mt-6 mb-3">Customer Commitment</h3>
  <p className="mb-4 text-gray-700 dark:text-gray-300">
    Your satisfaction is our priority. Our friendly and knowledgeable staff are always ready to assist you in choosing the right bike, providing maintenance tips, and ensuring a seamless cycling experience.
  </p>
</section>

      {/* Featured Products / Explore Section */}
   <section id="explore" className="w-full py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore the Cycle Shop</h2>

        {bikeSections.map(section => (
          <div key={section.type} className="mb-16">
            {/* Hero Image + Overlay */}
            <div className="relative w-full h-[500px] lg:h-[600px] mb-8">
              <Image src={section.image} alt={section.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-lg lg:text-xl text-white max-w-3xl">{section.description}</p>
              </div>
            </div>

       
          
          </div>
        ))}
      </section>
    
      {/* Footer */}
   {/* Footer */}
<footer className="bg-zinc-200 dark:bg-zinc-900 py-12 mt-16">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    
    {/* About */}
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Kritan Cycle Shop</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Located in Kathmandu, Ason. Offering trusted cycles for all ages and genuine parts at affordable prices.
      </p>
    </div>

    {/* Useful Links */}
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Useful Links</h3>
      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="#about" className="hover:underline">About Us</a></li>
        <li><a href="#contact" className="hover:underline">Contact Us</a></li>
        <li><a href="#explore" className="hover:underline">Our Collection</a></li>
        <li><a href="#category-bicycle" className="hover:underline">Category: Bicycle</a></li>
        <li><a href="#accessories" className="hover:underline">Accessories</a></li>
        <li><a href="#account" className="hover:underline">Account</a></li>
        <li><a href="#login" className="hover:underline">Customer Login</a></li>
        <li><a href="#addresses" className="hover:underline">Addresses</a></li>
        <li><a href="#payment" className="hover:underline">Payment Methods</a></li>
      </ul>
    </div>

    {/* Contact / Social */}
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Contact Us</h3>
      <p className="text-gray-700 dark:text-gray-300">Kritan Cycle Shop</p>
      <p className="text-gray-700 dark:text-gray-300">Kathmandu, Ason</p>
      <p className="text-gray-700 dark:text-gray-300">Phone: +977-XXXXXXX</p>
      <p className="text-gray-700 dark:text-gray-300">Email: info@govindacycleshop.com</p>
    </div>
  </div>

  <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
    &copy; {new Date().getFullYear()} Kritan Cycle Shop. All rights reserved.
  </div>
</footer>

    </div>
  );
}
