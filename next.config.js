/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  async rewrites() {
    return [
      {
      source:'/components/',
      destination: 'https://rpc.sepolia.org',
      },
      {
        source:'/utils/',
        destination: 'https://rpc.sepolia.org',
      },
      {
        source:'/pages/',
        destination: 'https://rpc.sepolia.org',
        },
    ]
  }
};

module.exports = nextConfig;
