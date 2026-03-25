"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRedirect = () => {
        setLoading(true);
        router.push("/dashboard");
    };
    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-2 mt-10 z-20">
            <div className="flex flex-col justify-center items-center my-5 z-20">
                <Image
                    src={"/hero.svg"}
                    alt="Hero-Section"
                    height={500}
                    width={500}
                    className="z-20"
                />

                <h1 className=" z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-linear-to-r from-rose-500 via-red-500 to-pink-500 dark:from-rose-400 dark:via-red-400 dark:to-pink-400 tracking-tight leading-[1.3] ">
                    Coding With with Intelligence
                </h1>
            </div>

            <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl z-20">
                AI Powered Code Editor is a powerful and intelligent code editor
                that enhances your coding experience with advanced features and
                seamless integration. It is designed to help you write, debug,
                and optimize your code efficiently.
            </p>
            <div className="z-20">
                <Button
                    variant={"brand"}
                    className="mb-4 hover:cursor-pointer"
                    size={"lg"}
                    onClick={handleRedirect}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <>
                            Get Started
                            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
