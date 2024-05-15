/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        pathname: '/**',
        hostname: '**',
        port: ''
      }
    ]
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'iokijs', 'encoding');
    return config;
  },
  reactStrictMode: true
};

export default nextConfig;
