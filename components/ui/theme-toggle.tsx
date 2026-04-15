"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { Button } from "./button";
import Reveal from "../providers/reveal";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Reveal>
            <Button
                variant="outline"
                size="sm"
                className="hover:cursor-pointer border-zinc-300 dark:border-zinc-700 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                onClick={() => {
                    setTheme(theme === "light" ? "dark" : "light");
                }}
            >
                {theme === "light" ? (
                    <Moon className="h-5 w-5 text-black" />
                ) : (
                    <Sun className="h-5 w-5 text-white" color="white" />
                )}
            </Button>
        </Reveal>
    );
}
