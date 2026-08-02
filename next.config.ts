import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que el badge "N" de Next.js tape el preview de las slides.
  devIndicators: false,
};

export default nextConfig;
