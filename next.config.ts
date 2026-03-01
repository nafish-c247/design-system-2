import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/design-system-2" : "",
  assetPrefix: isProd ? "/design-system-2/" : "",
};

export default nextConfig;