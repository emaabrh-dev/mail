import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules', 'styles'],
  },
  compiler: {
    styledComponents: true,
  }/*,
  async rewrites() {
    return [
    {
        source: '/api/v1/:path*',
        destination: 'http://localhost:9721/api/:path*' // Proxy to FastAPI
    },
    {
      source: '/api/v2/:path*',
      destination: 'http://localhost:9721/:path*' // Proxy to FastAPI
    }
    ];
  }*/
};

export default nextConfig;
