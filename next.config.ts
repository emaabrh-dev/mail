import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  sassOptions: {
    includePaths: ['node_modules', 'styles'],
  },
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
