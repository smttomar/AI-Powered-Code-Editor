import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex justify-center items-center h-screen flex-col dark:bg-zinc-800 bg-zinc-200">
            {children}
        </main>
    );
};

export default AuthLayout;
