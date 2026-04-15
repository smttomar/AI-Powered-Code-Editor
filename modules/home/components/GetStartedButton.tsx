"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/providers/reveal";

export default function GetStartedButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRedirect = () => {
        setLoading(true);
        router.push("/dashboard");
    };

    return (
        <Reveal>
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
                    <>
                        <span>Get Started</span>

                        <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </>
                )}
            </Button>
        </Reveal>
    );
}
