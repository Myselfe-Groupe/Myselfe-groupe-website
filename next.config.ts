import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "guxojqrfieuyebjqnpsd.supabase.co",
      },
    ],
  },
};

export default nextConfig;
