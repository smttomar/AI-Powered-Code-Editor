"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function LoadingButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            variant="outline"
            className="w-full hover:cursor-pointer"
            disabled={pending}
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                    <span>Redirecting...</span>
                </div>
            ) : (
                children
            )}
        </Button>
    );
}
