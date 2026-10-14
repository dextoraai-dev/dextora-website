import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/dextora-campus",
        destination: "/products/dextora-crm",
        permanent: true,
      },
      {
        source: "/campus",
        destination: "/products/dextora-crm",
        permanent: true,
      },
      {
        source: "/crm",
        destination: "/products/dextora-crm",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
