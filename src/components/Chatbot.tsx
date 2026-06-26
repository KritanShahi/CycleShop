"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      text: "Namaste! Welcome to Kritan Cycle Shop support. How can I help you ride today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getBotResponse = (text: string): string => {
    const query = text.toLowerCase();
    
    if (query.includes("location") || query.includes("where") || query.includes("address") || query.includes("place")) {
      return "Kritan Cycle Shop is located in the historic heart of Kathmandu, at Ason. We're open from 9:00 AM to 7:30 PM, Sunday through Friday!";
    }
    if (query.includes("contact") || query.includes("phone") || query.includes("number") || query.includes("call")) {
      return "You can call us directly at +977-1-42XXXXX or +977-98XXXXXXXX. You can also email us at support@kritancycleshop.com!";
    }
    if (query.includes("delivery") || query.includes("shipping") || query.includes("send") || query.includes("nepal")) {
      return "We offer free delivery within Kathmandu valley! For orders outside the valley, we ship via local courier partners at nominal rates, typically taking 2-3 business days.";
    }
    if (query.includes("payment") || query.includes("esewa") || query.includes("khalti") || query.includes("cash")) {
      return "We accept secure online payments via eSewa directly at checkout, as well as Cash on Delivery (COD) and bank transfers.";
    }
    if (query.includes("mountain") || query.includes("road") || query.includes("hybrid") || query.includes("bike") || query.includes("cycle")) {
      return "We carry a premium range of Mountain, Road, Hybrid, and Kids bikes! Brands include Oxford, Everest, Talon, and City. Explore our 'Shop' section to view specifications and filter by category.";
    }
    if (query.includes("price") || query.includes("cost") || query.includes("cheap") || query.includes("expensive")) {
      return "Our cycles range from $150 (for kids and basic models) up to $1500+ for professional mountain and road specs. All cycles come with a 1-year frame warranty!";
    }
    if (query.includes("discount") || query.includes("coupon") || query.includes("offer")) {
      return "Yes! Try entering the coupon code 'BIKER10' at checkout to get a 10% discount on your order!";
    }

    return "Thank you for reaching out! That is a great question. You can consult our experts directly by calling +977-1-42XXXXX, or visit our store in Ason to test ride any bicycle!";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: getBotResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex flex-col w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-green-600 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Kritan Cycle Assistant</h3>
                <span className="text-[10px] opacity-80">AI Support (Online)</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-50 dark:bg-zinc-950">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 max-w-[80%] ${
                  m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${
                    m.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-green-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === "user" ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick buttons */}
          <div className="flex gap-1.5 p-2 overflow-x-auto border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 scrollbar-none">
            <button
              onClick={() => handleSend("Where is your shop located?")}
              className="text-xs bg-gray-100 dark:bg-zinc-800 hover:bg-green-50 dark:hover:bg-green-950 text-zinc-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              📍 Location
            </button>
            <button
              onClick={() => handleSend("Do you have discounts or coupon codes?")}
              className="text-xs bg-gray-100 dark:bg-zinc-800 hover:bg-green-50 dark:hover:bg-green-950 text-zinc-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              🏷️ Discount
            </button>
            <button
              onClick={() => handleSend("How can I pay for my cycle?")}
              className="text-xs bg-gray-100 dark:bg-zinc-800 hover:bg-green-50 dark:hover:bg-green-950 text-zinc-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              💳 Payment Options
            </button>
            <button
              onClick={() => handleSend("What is your delivery policy?")}
              className="text-xs bg-gray-100 dark:bg-zinc-800 hover:bg-green-50 dark:hover:bg-green-950 text-zinc-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              🚚 Delivery Info
            </button>
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center px-3 py-2.5 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-zinc-950 text-sm border border-gray-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-zinc-800 dark:text-white"
            />
            <button
              type="submit"
              className="ml-2 p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-full transition focus:outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
