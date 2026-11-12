import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.grambahar.com',
            },
            {
                protocol: 'https',
                hostname: 'grambahar.com',
            }
        ],
    },
};

export default nextConfig;
