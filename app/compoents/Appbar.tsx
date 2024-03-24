"use client";
import React, { useState } from "react";
import { Logo } from "./Logo";

export const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className=" bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-5 py-3">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <div>
              <Logo />
            </div>
          </a>
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-hamburger"
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600 transition-colors duration-300"
            aria-controls="navbar-hamburger"
            aria-expanded={isMenuOpen ? "true" : "false"}>
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full ${isMenuOpen ? "" : "hidden"}`}
            id="navbar-hamburger">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-zinc-900">
              <li>
                <a
                  href="https://github.com/nischal-shetty2/rapidURL"
                  target="_blank"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-zinc-700 hover:text-white">
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nischal-shetty-2ba446272/"
                  target="_blank"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-zinc-700 hover:text-white">
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/NischalShetty02"
                  target="_blank"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-zinc-700 hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linktr.ee/nischal.shetty"
                  target="_blank"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-zinc-700 hover:text-white">
                  LinkTree
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
