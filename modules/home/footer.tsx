import Link from "next/link";
import { Github as LucideGithub } from "lucide-react";

export function Footer() {
    const socialLinks = [
        {
            href: "https://github.com/smttomar",
            icon: (
                <LucideGithub className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />
            ),
        },
    ];

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col items-center space-y-6 text-center z-20">
                {/* Social Links */}
                <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            className="p-2 z-20"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright Notice */}
                <p className="text-sm text-zinc-500 dark:text-zinc-400 z-20">
                    &copy; {new Date().getFullYear()} C.P. Singh. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
