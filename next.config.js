/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  // Vercel deployment optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Environment variables available to the client
  env: {
    NEXT_PUBLIC_APP_NAME: 'NutBot',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
