/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
    unoptimized: true, // For static export demo
  },
  trailingSlash: true,
};

module.exports = nextConfig;
