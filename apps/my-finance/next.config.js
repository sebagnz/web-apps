/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@web-apps/ui'],
  webpack: (config) => {
    return config
  },
}

module.exports = nextConfig
