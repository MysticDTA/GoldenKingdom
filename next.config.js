const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Disable SWC minifier
  experimental: {
    forceSwcTransforms: false // Disable SWC transforms (fallback to Node.js compiler)
  },
  webpack: (config) => {
    // Setup path aliases
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@/lib"] = path.resolve(__dirname, "src/lib");
    config.resolve.alias["@/components"] = path.resolve(__dirname, "src/components");
    config.resolve.alias["@/content"] = path.resolve(__dirname, "src/content");

    return config;
  }
};

module.exports = nextConfig;
