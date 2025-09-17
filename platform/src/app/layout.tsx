import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use the standard Inter font
import "./globals.css";
import Header from "@/components/Header";

// Configure the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Golden Kingdom",
  description: "A living temple for healing and unity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
