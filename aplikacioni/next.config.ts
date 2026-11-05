import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lejon telefonin në të njëjtin Wi-Fi gjatë zhvillimit (npm run dev).
  allowedDevOrigins: ["10.150.23.146"],
};

export default nextConfig;
