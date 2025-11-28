// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Community Portal",
  description: "Connect, share, and collaborate with your community",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* Only the client wrapper uses context */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
