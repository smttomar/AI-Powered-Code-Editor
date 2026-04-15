"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComingSoonPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleRedirect = () => {
        setLoading(true);

        // small delay for UX (optional)
        setTimeout(() => {
            router.replace("/dashboard");
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl text-center space-y-6"
            >
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold">
                    Feature Coming Soon 🚀
                </h1>

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
                    <button
                        onClick={handleRedirect}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium disabled:opacity-70 hover:cursor-pointer hover:bg-[#fff8f8] transition-colors duration-300"
                    >
                        {loading ? (
                            <>
                                {/* Spinner */}
                                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                Redirecting...
                            </>
                        ) : (
                            "Go Back"
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
