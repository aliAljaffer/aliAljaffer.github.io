import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Only allow fs module on server-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },
  output: "export",
  serverExternalPackages: ["gray-matter"],
  distDir: "dist",
  images: {
    remotePatterns: [
      new URL("https://alialjaffer-website.s3.me-south-1.amazonaws.com/**/**"),
    ],
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
