import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray package-lock.json in the
  // parent folder otherwise makes Turbopack resolve modules (e.g. tailwindcss)
  // from /Users/amedee/APP instead of here.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
