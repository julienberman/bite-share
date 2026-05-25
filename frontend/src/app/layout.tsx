import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Public_Sans,
} from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";

import { uploadRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-sans" });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bite-share",
  description: "Full-stack project template scaffold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(publicSans.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto min-h-screen w-full max-w-6xl px-6 sm:px-10">
          <header className="sticky top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center gap-6 border-b border-border bg-background/90 py-5 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-foreground"
            >
              BiteShare
            </Link>
            <p className="hidden text-center text-xs uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Split a night out with friends. No receipt math.
            </p>

            <nav className="flex items-center justify-end gap-2">
              <Button asChild size="nav" variant="ghost">
                <a href="/sign-in">Sign In</a>
              </Button>
            </nav>
          </header>
          <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
          <div className="py-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
