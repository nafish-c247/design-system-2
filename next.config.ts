import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/design-system-2",
  assetPrefix: "/design-system-2/",
};

export default nextConfig;