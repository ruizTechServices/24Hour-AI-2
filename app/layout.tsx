import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/context/Providers";
import { Open_Sans, Audiowide } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "24Hour-AI",
  description: "Your 24/7 AI assistant for work, code, and study. Empowering professionals with affordable access to premium AI models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${audiowide.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
