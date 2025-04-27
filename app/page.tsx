"use client";
import { Appbar } from "./compoents/Appbar";
import { UrlInput } from "./compoents/UrlInput";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Appbar />
      </div>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
          <div className="max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-10">
              <motion.h1
                className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}>
                Shorten Your Links Instantly
              </motion.h1>
              <motion.p
                className="text-gray-300 text-lg md:text-xl max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}>
                Create clean, memorable URLs in seconds with our powerful URL
                shortener
              </motion.p>
            </motion.div>

            <motion.div
              className="backdrop-blur-lg bg-black/30 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800/50"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}>
              <UrlInput />
            </motion.div>

            <motion.div
              className="mt-12 text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}>
              RapidURL helps you transform long, unwieldy links into clean,
              memorable URLs
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
