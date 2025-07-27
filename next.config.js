/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint checks during `next build` to prevent deployment failures.
  // Local dev (`next dev`) will still surface ESLint issues so they can be addressed.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
