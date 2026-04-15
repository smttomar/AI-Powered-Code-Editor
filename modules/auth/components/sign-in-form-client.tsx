import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Chrome, Github } from "lucide-react";
import { signIn } from "@/auth";
import Link from "next/link";
import { LoadingButton } from "./loading-button";
import Reveal from "@/components/providers/reveal";

async function handleGoogleSignIn() {
    "use server";
    await signIn("google");
}

async function handleGithubSignIn() {
    "use server";
    await signIn("github");
}

const SignInFormClient = () => {
    return (
        <Reveal>
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <Reveal>
                        <CardTitle className="text-2xl font-bold text-center">
                            Sign In
                        </CardTitle>
                    </Reveal>
                    <Reveal>
                        <CardDescription className="text-center">
                            Choose your preferred sign-in method
                        </CardDescription>
                    </Reveal>
                </CardHeader>
                <Reveal>
                    <CardContent className="grid gap-4">
                        <form action={handleGoogleSignIn}>
                            <Reveal>
                                <LoadingButton>
                                    <Chrome className="mr-2 h-4 w-4" />
                                    <span>Sign in with google</span>
                                </LoadingButton>
                            </Reveal>
                        </form>
                        <form action={handleGithubSignIn}>
                            <Reveal>
                                <LoadingButton>
                                    <Github className="mr-2 h-4 w-4" />
                                    <span>Sign in with github</span>
                                </LoadingButton>
                            </Reveal>
                        </form>
                    </CardContent>
                </Reveal>
                <CardFooter>
                    <Reveal>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
                            By signing in, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </Reveal>
                </CardFooter>
            </Card>
        </Reveal>
    );
};

export default SignInFormClient;
