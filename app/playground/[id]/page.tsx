"use client";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { useParams } from "next/navigation";
import React from "react";

const MainPlaygroundPage = () => {
    const { id } = useParams<{ id: string }>();

    const { playgroundData, templateData, isLoading, error, saveTemplateData } =
        usePlayground(id);

    console.log("templateData", templateData);
    console.log("playgroundData", playgroundData);

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-br from-gray-600 to-black px-4">
            <div className="bg-black shadow-xl rounded-2xl p-8 max-w-md text-center">
                <h1 className="text-3xl font-bold text-[#e93f3f] mb-4">
                    🚧 Playground Coming Soon
                </h1>

                <p className="text-gray-600 text-lg">
                    We're working hard to build an exciting interactive
                    playground for you. Stay tuned—great things are on the way!
                </p>
            </div>
        </div>
    );
};

export default MainPlaygroundPage;
