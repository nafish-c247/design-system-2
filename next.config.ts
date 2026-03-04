import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isStaticExport
    ? {
        output: "export",
        basePath: "/design-system-2",
        assetPrefix: "/design-system-2/",
      }
    : {}),
};

export default nextConfig;