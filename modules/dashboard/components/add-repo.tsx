"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const AddRepo = () => {
    const [openRepoModal, setOpenRepoModal] = useState(false);
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const fetchRepos = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/github/repos");
            const data = await res.json();

            setRepos(data.repos || []);
        } catch (error) {
            console.error("Error fetching repos:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSelectRepo = (repo: any) => {
        console.log("Selected repo:", repo);

        setOpenRepoModal(false);

        // next step: open repo in editor
    };
    return (
        <>
            <div
                onClick={() => {
                    if (!session?.accessToken) {
                        toast.error("Login with GitHub to access repositories");
                        return;
                    }
                    setOpenRepoModal(true);
                    fetchRepos();
                }}
                className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:bg-background hover:border-[#E93F3F] hover:scale-[1.02]
      shadow-[0_2px_10px_rgba(0,0,0,0.08)]
      hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
            >
                <div className="flex flex-row justify-center items-start gap-4">
                    <Button
                        variant={"outline"}
                        className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
                        size={"icon"}
                    >
                        <ArrowDown
                            size={30}
                            className="transition-transform duration-300 group-hover:translate-y-1"
                        />
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-[#e93f3f]">
                            Open Github Repository
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-55">
                            Work with your repositories in our editor
                        </p>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <Image
                        src={"/github.svg"}
                        alt="Open GitHub repository"
                        width={150}
                        height={150}
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
            </div>
            {openRepoModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="relative bg-zinc-900 w-150 max-h-125 rounded-lg p-6 overflow-y-auto">
                        <button
                            className="mt-4 text-2xl text-zinc-400 hover:text-zinc-200 transition hover:cursor-pointer absolute top-2 right-2"
                            onClick={() => setOpenRepoModal(false)}
                        >
                            x
                        </button>
                        <h2 className="text-lg font-semibold mb-4 text-white">
                            Select Repository
                        </h2>

                        {loading ? (
                            <p className="text-zinc-400">Loading...</p>
                        ) : (
                            <div className="space-y-2">
                                {repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 cursor-pointer transition"
                                        onClick={() => handleSelectRepo(repo)}
                                    >
                                        <p className="text-white font-medium">
                                            {repo.name}
                                        </p>
                                        <p className="text-xs text-zinc-400">
                                            {repo.full_name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRepo;
