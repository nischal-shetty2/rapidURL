"use client";
import { motion } from "framer-motion";
import { LinkIcon } from "@heroicons/react/24/solid";

export const Logo = () => {
  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}>
      <motion.div
        className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-lg"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}>
        <LinkIcon className="h-5 w-5 text-white" />
      </motion.div>
      <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-2xl tracking-tight">
        Rapid
        <span className="text-white group-hover:text-purple-300 transition-colors duration-300">
          URL
        </span>
      </div>
    </motion.div>
  );
};
