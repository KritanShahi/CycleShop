"use client";

import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/categoriesApi";
import { Layers, Mountain, Flame, Shuffle, HelpCircle, ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  // Mapping helper to give each category a unique visual gradient, icon, and tag line
  const categoryMetaData: Record<string, { gradient: string; icon: any; tag: string }> = {
    mountain: {
      gradient: "from-emerald-600/10 to-teal-600/5 hover:border-emerald-500/40",
      icon: <Mountain className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      tag: "Rugged Offroad Trails"
    },
    road: {
      gradient: "from-sky-600/10 to-indigo-600/5 hover:border-sky-500/40",
      icon: <Flame className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
      tag: "Aerodynamic Pure Speed"
    },
    hybrid: {
      gradient: "from-amber-600/10 to-orange-600/5 hover:border-amber-500/40",
      icon: <Shuffle className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      tag: "City Commute & Streets"
    },
    kids: {
      gradient: "from-pink-600/10 to-rose-600/5 hover:border-pink-500/40",
      icon: <Layers className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
      tag: "Stable Learn-To-Ride"
    }
  };

  const defaultMeta = {
    gradient: "from-zinc-600/10 to-zinc-500/5 hover:border-zinc-500/40",
    icon: <HelpCircle className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />,
    tag: "Genuine Cycles"
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans py-16 px-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="inline-block bg-green-100 dark:bg-green-950/45 text-green-700 dark:text-green-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Categories Catalog
          </span>
        <h1 className="text-4xl font-extrabold tracking-tight">Browse By Bicycle Type</h1>
        <p className="text-sm text-zinc-500">
          Find the ideal configuration tailored specifically for your riding preference, terrain choices, and style.
        </p>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 space-y-4 animate-pulse h-72 flex flex-col justify-between">
              <div className="w-14 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-2/3 rounded" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-full rounded" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-5/6 rounded" />
              </div>
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 w-1/3 rounded" />
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
          <Layers className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">No Categories Registered</h3>
          <p className="text-zinc-500 text-xs mt-1">Please populate database tables or run seed configurations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((c) => {
            const meta = categoryMetaData[c.slug] || defaultMeta;
            return (
              <div
                key={c.id}
                className={`bg-gradient-to-br ${meta.gradient} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-inner flex items-center justify-center">
                    {meta.icon}
                  </div>
                  
                  {/* Text Details */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest block">
                      {meta.tag}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {c.description || "Premium quality build configurations and parts designed for performance and reliability."}
                    </p>
                  </div>
                </div>

                {/* Explore button */}
                <div className="pt-8">
                  <Link
                    href={`/products?q=${c.name}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 group-hover:gap-2.5 transition-all"
                  >
                    Explore Collection <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Premium Banner Grid Footer */}
      <div className="mt-20 bg-zinc-900 dark:from-zinc-900 dark:to-black border border-zinc-800 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(22,163,74,0.1),transparent)] pointer-events-none" />
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h3 className="text-2xl font-bold tracking-tight">Need Help Choosing a Bicycle?</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Our expert mechanics and customer care executives can assist you in finding the perfect size, gear ratio, and configuration for your specific height and needs.
          </p>
        </div>
        <Link
          href="/about"
          className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-8 py-3.5 rounded-full transition shadow-md whitespace-nowrap"
        >
          Contact Our Store
        </Link>
      </div>

    </div>
  );
}
