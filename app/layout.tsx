import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RapidURL | Fast URL Shortener",
  description: "Create short, clean, and memorable URLs in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 bg-hero-pattern min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
