"use client";

import { useSearchParams } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/modules/auth/components/loading-button";
import { Github } from "lucide-react";
import { useState } from "react";

export default function AuthErrorPage() {
    const router = useRouter();
    const params = useSearchParams();
    const error = params.get("error");
    const [loading, setLoading] = useState(false);

    return (
        <div className="h-full w-full flex items-center justify-center bg-white dark:bg-black">
            <div className="dark:bg-zinc-900 bg-zinc-200 p-10 rounded-lg text-center">
                <h1 className="text-[#e93f3f] text-2xl font-bold mb-2">
                    Authentication Error
                </h1>

                <p className="dark:text-zinc-400 text-zinc-800  mb-4">
                    {error === "GitHubNotConnected"
                        ? "Please Sigh In with GitHub account to access repositories."
                        : error === "OAuthAccountNotLinked"
                          ? "This account is already registered with another provider."
                          : "Something went wrong"}
                </p>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                        setLoading(true);
                        await signOut();
                        router.refresh();
                    }}
                    disabled={loading}
                    className="hover:cursor-pointer hover:text-[#E93F3F] mt-4 ml-2 mr-2"
                >
                    {loading ? (
                        <div className="flex items-center hover:cursor-not-allowed gap-2 text-[#E93F3F]">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <>
                            <Github className="w-3.5 h-3.5" />
                            Try to Sign In with GitHub
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
