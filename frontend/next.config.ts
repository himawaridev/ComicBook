import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.truyenhoan.com",
            },
        ],
    },
};

export default nextConfig;
