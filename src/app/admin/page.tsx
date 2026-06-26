"use client";

import React from "react";
import Sidebar from "./components/Sidebar";
import { useGetDashboardAnalyticsQuery } from "@/store/ordersApi";
import { DollarSign, ShoppingCart, ShieldAlert, TrendingUp, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const { data: analytics, isLoading } = useGetDashboardAnalyticsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Draw chart dimensions
  const sales = analytics?.dailySales || [];
  const maxSale = Math.max(...sales.map((s: any) => s.total), 100);
  const chartWidth = 500;
  const chartHeight = 150;

  // Build points for SVG path
  const points = sales
    .map((s: any, i: number) => {
      const x = (i / (sales.length - 1 || 1)) * chartWidth;
      const y = chartHeight - (s.total / maxSale) * (chartHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-8">
        <header className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-xs text-zinc-500 mt-1">Overview of Cycle Shop sales performance and operations.</p>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Revenue */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-950/20 text-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Total Revenue</span>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-0.5">
                Rs. {analytics?.totalRevenue?.toLocaleString() || "0"}
              </h3>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 text-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Total Orders</span>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-0.5">
                {analytics?.totalOrders || "0"}
              </h3>
            </div>
          </div>

          {/* Low Stock Warn */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Low Stock alerts</span>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-0.5">
                {analytics?.lowStockCount || "0"}
              </h3>
            </div>
          </div>
        </div>

        {/* Charts & Stocks List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Chart Card */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" /> Sales Performance (Past 7 Days)
              </h3>
            </div>

            {sales.length > 0 ? (
              <div className="pt-4 flex flex-col items-center">
                {/* SVG Chart */}
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2={chartWidth} y2="10" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
                  <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
                  <line x1="0" y1={chartHeight - 10} x2={chartWidth} y2={chartHeight - 10} stroke="#e4e4e7" strokeWidth="1" className="dark:stroke-zinc-750" />

                  {/* Gradient Area under chart line */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {points && (
                    <>
                      <path
                        d={`M 0,${chartHeight - 10} L ${points} L ${chartWidth},${chartHeight - 10} Z`}
                        fill="url(#chartGradient)"
                      />
                      <polyline
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        points={points}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}

                  {/* Points dots */}
                  {sales.map((s: any, i: number) => {
                    const x = (i / (sales.length - 1 || 1)) * chartWidth;
                    const y = chartHeight - (s.total / maxSale) * (chartHeight - 20) - 10;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        className="fill-green-600 stroke-white dark:stroke-zinc-900"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>

                {/* X Axis dates */}
                <div className="flex justify-between w-full mt-3 text-[9px] text-zinc-400 font-semibold px-2">
                  {sales.map((s: any, i: number) => (
                    <span key={i}>{s.date.slice(5)}</span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-xs py-10 text-center">No completed sales recorded in the past 7 days.</p>
            )}
          </div>

          {/* Low Stock Warning Card */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-sm flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-4 h-4" /> Low Inventory Alerts
            </h3>
            
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-[200px] overflow-y-auto pr-1">
              {!analytics?.lowStockCycles || analytics.lowStockCycles.length === 0 ? (
                <p className="text-zinc-500 text-xs py-8 text-center">All products are healthy. No alerts!</p>
              ) : (
                analytics.lowStockCycles.map((c: any) => (
                  <div key={c.id} className="flex justify-between items-center py-2 text-xs">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate pr-2 max-w-[150px]">{c.name}</span>
                    <span className="bg-amber-100 text-amber-700 dark:bg-amber-950/20 px-2 py-0.5 rounded font-bold">
                      {c.stock} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
