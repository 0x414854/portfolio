/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    legacyBrowsers: false, // 👈 très important
  },
};
export default nextConfig;
