import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  // Static export — REQUIRED for Netlify Forms to capture leads (host fix 2026-06-25).
  output: "export",
  images: { unoptimized: true },
  // Fix workspace-root inference confusion when multiple lockfiles are present
  // (prevents Next from mis-selecting parent /app/websites/ as the tracing root)
  outputFileTracingRoot: path.join(__dirname),
};
export default nextConfig;
