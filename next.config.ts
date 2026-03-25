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
    webpack: (config) => {
        config.module.rules.push({
            test: /codefile-starters/,
            use: "ignore-loader",
        });
        return config;
    },
};

export default nextConfig;
