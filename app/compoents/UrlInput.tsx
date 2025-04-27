"use client";
import React, { ChangeEvent, useState } from "react";
import { handleOnclick } from "@/app/actions/handleclick";
import { motion, AnimatePresence } from "framer-motion";
import { CopyIcon, CheckIcon, LinkIcon } from "./Icons";
import { LinkSlashIcon } from "@heroicons/react/24/solid";
import { BiLink } from "react-icons/bi";

export const UrlInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>("");
  const [awaiting, setAwaiting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    setAwaiting(true);
    try {
      const shortenedUrl = await handleOnclick(inputValue);
      if (shortenedUrl === inputValue) {
        setError(true);
        setTimeout(() => setError(false), 3000);
      } else {
        setError(false);
        setOutputValue(shortenedUrl);
      }
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setAwaiting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <BiLink className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your long URL here..."
              className="block w-full px-4 py-4 ps-12 bg-gray-900/50 border border-gray-700 rounded-lg text-white transition-colors duration-200 placeholder:text-gray-300 placeholder:opacity-100 box-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0 focus:outline-none"
              disabled={awaiting}
            />

            <AnimatePresence>
              {error && (
                <motion.div
                  className="absolute left-0 w-full text-center text-red-400 text-sm"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  Please enter a valid URL (e.g., https://example.com)
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={awaiting}
            className={`ml-3 px-6 py-4 rounded-lg font-medium transition-all duration-300 text-white
              ${
                awaiting
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
              }`}>
            {awaiting ? (
              <div className="flex items-center">
                <Spinner />
                <span className="ml-2">Processing...</span>
              </div>
            ) : (
              "Shorten URL"
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {outputValue && (
          <div>
            <div className="flex flex-col sm:flex-row bg-gray-900/50 py-2 px-4 rounded-lg items-start sm:items-center justify-between space-y-3 sm:space-y-0 mt-5">
              <div className="flex-1 min-w-0 pr-2">
                {" "}
                {/* Added min-width and padding */}
                <div className="text-sm text-gray-200 mb-1">
                  Your shortened URL:
                </div>
                <a
                  href={outputValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors truncate block">
                  {" "}
                  {/* Added truncate and block */}
                  {outputValue.replace(/^https?:\/\//, "")}
                </a>
              </div>
              <motion.button
                onClick={copyToClipboard}
                className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-md transition-all ${
                  copied
                    ? "bg-green-600/20 text-green-400 border border-green-600/30"
                    : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}>
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Spinner = () => {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5 animate-spin text-gray-600 fill-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
};
