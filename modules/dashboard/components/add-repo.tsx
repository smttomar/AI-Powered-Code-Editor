// "use client";
// import { Button } from "@/components/ui/button";
// import { ArrowDown } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { useSession, signIn } from "next-auth/react";
// import { toast } from "sonner";
// import { RepoModal } from "./repo-selecting-model";

// const AddRepo = () => {
//     const [openRepoModal, setOpenRepoModal] = useState(false);
//     const [repos, setRepos] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const { data: session } = useSession();
//     const isGithubUser = session?.user && (session as any)?.accessToken;
//     const fetchRepos = async () => {
//         try {
//             setLoading(true);

//             const res = await fetch("/api/github/repos");
//             const data = await res.json();

//             setRepos(data.repos || []);
//         } catch (error) {
//             console.error("Error fetching repos:", error);
//         } finally {
//             setLoading(false);
//             toast.success("Repositories fetched successfully");
//         }
//     };
//     const handleSelectRepo = (repo: any) => {
//         console.log("Selected repo:", repo);

//         setOpenRepoModal(false);

//         // next step: open repo in editor
//     };
//     return (
//         <>
//             <div
//                 onClick={() => {
//                     if (!isGithubUser) {
//                         window.location.href =
//                             "/auth/error?error=GitHubNotConnected";
//                         return;
//                     }
//                     setOpenRepoModal(true);
//                     fetchRepos();
//                 }}
//                 className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer
//       transition-all duration-300 ease-in-out
//       hover:bg-background hover:border-[#E93F3F] hover:scale-[1.02]
//       shadow-[0_2px_10px_rgba(0,0,0,0.08)]
//       hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
//             >
//                 <div className="flex flex-row justify-center items-start gap-4">
//                     <Button
//                         variant={"outline"}
//                         className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
//                         size={"icon"}
//                     >
//                         <ArrowDown
//                             size={30}
//                             className="transition-transform duration-300 group-hover:translate-y-1"
//                         />
//                     </Button>
//                     <div className="flex flex-col">
//                         <h1 className="text-xl font-bold text-[#e93f3f]">
//                             {isGithubUser
//                                 ? "Open GitHub Repository [Beta]"
//                                 : "Connect GitHub"}
//                         </h1>

//                         <p className="text-sm text-muted-foreground max-w-55">
//                             {isGithubUser
//                                 ? "Work with your repositories in our editor"
//                                 : "Connect your GitHub account to access repositories"}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="relative overflow-hidden">
//                     <Image
//                         src={"/github.svg"}
//                         alt="Open GitHub repository"
//                         width={150}
//                         height={150}
//                         className="transition-transform duration-300 group-hover:scale-110"
//                     />
//                 </div>
//             </div>
//             <RepoModal
//                 open={openRepoModal}
//                 onOpenChange={setOpenRepoModal}
//                 repos={repos}
//                 loading={loading}
//                 onSelect={handleSelectRepo}
//             />
//         </>
//     );
// };

// export default AddRepo;

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const AddRepo = () => {
    return (
        <div
            className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:bg-background hover:border-[#E93F3F] hover:scale-[1.02]
      shadow-[0_2px_10px_rgba(0,0,0,0.08)]
      hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
        >
            <div className="flex flex-row justify-center items-start gap-4">
                <Button
                    variant={"outline"}
                    className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] hover:cursor-pointer group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
                    size={"icon"}
                >
                    <ArrowDown
                        size={30}
                        className="transition-transform duration-300 group-hover:translate-y-1"
                    />
                </Button>
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-[#e93f3f]">
                        Open Github Repository [Beta]
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
    );
};

export default AddRepo;
