"use client";

import Link from "next/link";
import { History, Sparkles, Compass, ShieldCheck, Award, Store, Users, MapPin } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: "100% Genuine Quality",
      desc: "Every frame, derailleur, and accessory is sourced directly from certified manufacturers. No duplicates, ever."
    },
    {
      icon: <Award className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: "Expert Craftsmanship",
      desc: "Our senior mechanics have over 20 years of hands-on tuning experience. Every bicycle is hand-built and safety-tested."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: "Community First",
      desc: "We sponsor local rides, support trail building projects, and aim to foster a healthy cycling culture across Nepal."
    }
  ];

  const milestones = [
    { year: "2050 B.S.", title: "The Humble Beginning", desc: "Started as a small parts workshop in the historic alleys of Ason, Kathmandu." },
    { year: "2065 B.S.", title: "Expansion & Imports", desc: "Began direct importing of premium brands and became the valley's trusted hub for high-end gear." },
    { year: "2078 B.S.", title: "Digital Journey", desc: "Launched online catalogs and workshop booking portals to serve riders nationwide." },
    { year: "Present Day", title: "Nepal's Premium Retailer", desc: "Stocking over 100 models with thousands of happy riders and a full-scale service center." }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-700 py-20 text-white text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
          <span className="inline-block bg-white/25 backdrop-blur-md text-xs font-semibold px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-widest text-emerald-100">
            Our Legacy & Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Riding With Trust Since <span className="text-emerald-300">2050 B.S.</span>
          </h1>
          <p className="text-base sm:text-lg text-emerald-50/90 max-w-2xl mx-auto leading-relaxed">
            From our origin in historic Ason to the digital era, we have dedicated ourselves to building Nepal's premier cycling community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        
        {/* Heritage Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider">
              <History className="w-5 h-5" />
              <span>Over Three Decades of Passion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Rooted in the Heart of Kathmandu
            </h2>
            <div className="w-16 h-1.5 bg-green-600 dark:bg-green-400 rounded-full" />
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              Nestled in the historic market hub of Kathmandu at Ason, Kritan Cycle Shop has been providing genuine, reliable cycles and spare parts since 2050 B.S. What began as a local workshop has grown to represent decades of trust for generations of riders.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              We hand-assemble every bicycle to ensure maximum safety, utilizing lightweight alloy frames and genuine parts. Whether you are climbing the rugged trails of Kakani or weaving through city traffic, our bicycles are built for performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-3 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-2xl shadow-sm">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-bold">Visit Store</h4>
                  <p className="text-zinc-500">Ason, Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-2xl shadow-sm">
                <Store className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-bold">Working Hours</h4>
                  <p className="text-zinc-500">Sunday - Friday (9 AM - 7 PM)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="bg-gradient-to-tr from-green-500/10 to-emerald-600/5 dark:from-green-500/5 dark:to-transparent border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl flex flex-col justify-between h-[360px] sm:h-[450px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Our Promise</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                We believe a bicycle is more than just gears and metal; it’s a vessel for adventure, a clean commute, and a healthy life. We treat every customer build as if it were our own.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6 relative z-10">
              <div>
                <span className="block text-3xl font-extrabold text-green-600 dark:text-green-400">30K+</span>
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">Riders Served</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-green-600 dark:text-green-400">100%</span>
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">Genuine Parts</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Our Core Values</h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">The principles that guide our business, mechanics, and service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-inner">
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg">{v.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Milestones */}
        <section className="bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 rounded-3xl space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Our Journey Timeline</h2>
              <p className="text-sm text-zinc-500 mt-1">A timeline of our historical highlights and major milestones.</p>
            </div>
            <Link
              href="/Bicycle"
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition"
            >
              Explore Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-green-500/55 dark:hover:border-green-500/55 transition shadow-sm flex flex-col justify-between">
                <span className="text-xs bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-bold w-fit">
                  {m.year}
                </span>
                <div className="space-y-1 pt-2">
                  <h4 className="font-bold text-sm text-zinc-800 dark:text-white leading-tight">{m.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
