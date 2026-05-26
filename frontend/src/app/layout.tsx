import type { Metadata } from "next";
import "./globals.css";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { JetBrains_Mono, Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "BiteShare",
    description: "Split a night out with friends.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(publicSans.variable, jetbrainsMono.variable)}
        >
            <body className="font-sans antialiased">
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
                        <nav className="ml-auto flex items-center gap-2">
                            <Button asChild size="nav" variant="ghost">
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        </nav>
                    </header>
                    {children}
                </div>
            </body>
        </html>
    );
}
