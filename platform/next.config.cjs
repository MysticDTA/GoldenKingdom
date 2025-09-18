/** @type {import('next').NextConfig} */

// Detect if running inside Termux (Android)
const isTermux = process.platform === "android";

const nextConfig = {
  reactStrictMode: true,

  // Disable SWC only on Termux, use Babel instead
  swcMinify: !isTermux,
};

module.exports = nextConfig;
