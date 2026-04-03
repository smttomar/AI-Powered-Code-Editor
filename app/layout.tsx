import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/providers/theme-providers";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://ai-powered-code-editor.vercel.app/"), // change this

    title: {
        default: "AI Powered Code Editor - Build, Run & Debug Code with AI",
        template: "%s | AI Powered Code Editor",
    },

    description:
        "An AI-powered online code editor that helps developers write, debug, and run code faster with intelligent suggestions, real-time preview, and GitHub integration.",

    keywords: [
        "AI Powered Code Editor",
        "Online IDE",
        "Code Playground",
        "AI Programming",
        "Next.js Editor",
        "Web Code Editor",
        "GitHub Integration",
        "AI Autocomplete",
        "Developer Tools",
    ],

    authors: [{ name: "Chandra Pratap Singh" }],

    creator: "Chandra Pratap Singh",

    openGraph: {
        title: "AI Powered Code Editor - Smart Coding with AI",
        description:
            "Write, debug, and run code faster using AI-powered suggestions and real-time execution.",
        url: "https://ai-powered-code-editor.vercel.app/", // change this
        siteName: "AI Powered Code Editor",
        images: [
            {
                url: "/og-image.png", // add your OG image in public folder
                width: 1200,
                height: 630,
                alt: "AI Powered Code Editor Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "AI Powered Code Editor",
        description:
            "An AI-powered coding environment with smart suggestions and live preview.",
        images: ["/og-image.png"],
    },

    icons: {
        icon: "/favicon.ico",
    },

    category: "technology",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex flex-col min-h-screen">
                            <Toaster />
                            <div className="flex-1">{children}</div>
                        </div>
                    </ThemeProvider>
                    <Analytics />
                </body>
            </html>
        </SessionProvider>
    );
}
