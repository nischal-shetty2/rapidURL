"use client";
import React, { ChangeEvent, useState } from "react";
import { handleOnclick } from "@/app/actions/handleclick";

export const UrlInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>("");
  const [awaiting, setAwaiting] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [value, setValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setInputValue(e.target.value);
  };

  const DisplayLink = () => {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(outputValue);
        setCopied(true);
      } catch (error) {
        alert("Failed to copy:");
        setCopied(false);
      }
    };

    return (
      <div className="text-white flex flex-col justify-center pl-10 my-2 ">
        <div className="flex justify-between">
          <a
            className=" mt-2 hover:text-blue-500 ease-in-out duration-700 text-slate-400"
            href={outputValue}>
            {outputValue}
          </a>
          <button
            onClick={copyToClipboard}
            type="button"
            className=" ease-in-out duration-500 border focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-5 py-2 mx-4 bg-black text-white border-gray-700 hover:bg-black hover:border-gray-200 focus:ring-gray-700">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {error ? <ShowToast /> : null}
      <div className="w-screen max-w-2xl bg-blend-darken rounded-lg px-3 mb-20">
        <div className=" hover:shadow-md hover:shadow-purple-800 ease-in-out duration-500 rounded-xl">
          <form>
            <label className="mb-2 text-sm font-medium sr-only text-white">
              Search
            </label>
            <div className="relative">
              <input
                onChange={handleInputChange}
                type="search"
                id="search"
                value={value}
                className="text-white block w-full p-4 pl-2 ps-10 text-sm  rounded-lg bg-black  placeholder-gray-500 focus:ring-white focus:border-white appearance-none"
                placeholder="https://example.xyz.com"
                required
              />
              {awaiting ? (
                <Spinner />
              ) : (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    setAwaiting(true);
                    const shortenedUrl = await handleOnclick(inputValue);
                    if (shortenedUrl === inputValue) {
                      seterror(true);
                    } else {
                      seterror(false);
                      setOutputValue(shortenedUrl);
                      setValue("");
                    }
                    setAwaiting(false);
                  }}
                  type="submit"
                  className=" ease-in-out duration-500 text-white absolute end-2.5 bottom-2.5 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-black border border-gray-700 hover:border-gray-200 hover:text-blue-100">
                  Shorten URL
                </button>
              )}
            </div>
          </form>
        </div>
        {outputValue === "" ? null : (
          <div className=" border border-zinc-700 rounded-md mt-8">
            <DisplayLink />
          </div>
        )}
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 animate-spin text-gray-600 fill-blue-600 absolute end-2.5 bottom-2.5 mr-4"
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
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const ShowToast = () => {
  const toast = document.createElement("div");
  toast.textContent = "Invalid URL Try again";
  toast.classList.add(
    "fixed",
    "bottom-0",
    "left-0",
    "w-full",
    "bg-red-500",
    "text-white",
    "text-center",
    "py-2",
    "z-50",
    "transition",
    "duration-300",
    "ease-in-out"
  );

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
  return <></>;
};
