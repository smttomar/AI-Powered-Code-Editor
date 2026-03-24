import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
                port: "",
                pathname: "/**",
            },
        ],
    },
    async headers() {
        return [
            {
                // Apply to all routes
                source: "/:path*",
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                ],
            },
        ];
    },
    reactStrictMode: false,
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@angular": false,
        };
        return config;
    },
};

export default nextConfig;
