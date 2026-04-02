// "use client";

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Github, Plus } from "lucide-react";
// import { useState } from "react";

// export function RepoModal({
//     open,
//     onOpenChange,
//     repos,
//     loading,
//     onSelect,
// }: any) {
//     const [search, setSearch] = useState("");

//     const filteredRepos = repos.filter((repo: any) =>
//         repo.name.toLowerCase().includes(search.toLowerCase()),
//     );

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="max-w-2xl">
//                 <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold text-[#e93f3f] flex items-center gap-2">
//                         <Plus size={24} className="text-[#e93f3f]" />
//                         Select Repository
//                     </DialogTitle>
//                     <DialogDescription>
//                         Pick a repository to load into the editor and begin
//                         coding with AI support.
//                     </DialogDescription>
//                 </DialogHeader>

//                 {/* Search */}
//                 <Input
//                     placeholder="Search repositories..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />

//                 {/* Repo List */}
//                 <ScrollArea className="h-100 mt-4">
//                     {loading ? (
//                         <div className="space-y-3">
//                             {[...Array(5)].map((_, i) => (
//                                 <Skeleton key={i} className="h-16 w-full" />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="space-y-3">
//                             {filteredRepos.map((repo: any) => (
//                                 <div
//                                     key={repo.id}
//                                     onClick={() => onSelect(repo)}
//                                     className="flex items-center gap-3 p-4 rounded-xl border hover:bg-muted cursor-pointer transition"
//                                 >
//                                     <Github className="w-5 h-5 text-muted-foreground" />

//                                     <div className="flex flex-col gap-1">
//                                         <span className="font-medium">
//                                             {repo.name}
//                                         </span>
//                                         <span className="text-xs text-muted-foreground">
//                                             {repo.full_name}
//                                         </span>
//                                         <span className="text-xs px-2 py-1 bg-muted rounded-full w-max text-muted-foreground">
//                                             {repo.language}
//                                         </span>
//                                         <span className="text-xs text-muted-foreground">
//                                             ⭐ {repo.stargazers_count}
//                                         </span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </ScrollArea>
//             </DialogContent>
//         </Dialog>
//     );
// }
