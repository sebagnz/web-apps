/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@my-finance/ui'],
  webpack: (config) => {
    return config
  },
}

module.exports = nextConfig
