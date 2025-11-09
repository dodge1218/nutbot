/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Server Actions are enabled by default in Next.js 14
  // Vercel deployment optimization with Supabase
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Environment variables available to the client
  env: {
    NEXT_PUBLIC_APP_NAME: 'NutBot',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  // Optimize for Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig
