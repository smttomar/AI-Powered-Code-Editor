import { Metadata } from "next";
import { Header } from "@/modules/home/header";
import { Footer } from "@/modules/home/footer";
import { cn } from "@/lib/utils";

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

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Header />
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-size-[40px_40px]",
                    "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
            <main className="z-20 realtive w-full pt-0">{children}</main>
            <Footer />
        </div>
    );
}
