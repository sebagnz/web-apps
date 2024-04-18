/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@web-apps/ui'],
  webpack: (config) => {
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig
