/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@web-apps/ui'],
  webpack: (config) => {
    return config
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
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
