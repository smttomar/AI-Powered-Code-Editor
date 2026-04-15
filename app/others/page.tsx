"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleRedirect = () => {
        setLoading(true);
        setTimeout(() => {
            router.replace("/dashboard");
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br dark:bg-zinc-900 bg-zinc-100 text-[#e93f3f] px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl text-center space-y-6"
            >
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border dark:border-white/20 border-black/20">
                        <Github className="w-10 h-10 text-[#e93f3f]" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold">Feature Coming Soon 🚀</h1>

                {/* Subtitle */}
                <p className="text-zinc-400 text-lg">
                    We are working hard to bring this feature to you. Stay tuned
                    for something amazing!
                </p>

                {/* Divider */}
                <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-white to-transparent mx-auto" />

                {/* Description */}
                <p className="text-zinc-500 text-sm">
                    This feature is currently under development and will be
                    available in a future update. We appreciate your patience 🙌
                </p>

                {/* Button */}
                <div className="pt-4 flex justify-center">
                    <Button
                        variant="brand"
                        size="lg"
                        onClick={handleRedirect}
                        disabled={loading}
                        className="mb-4 hover:cursor-pointer"
                    >
                        {loading ? (
                            <div className="flex items-center hover:cursor-not-allowed gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <>Home</>
                        )}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
