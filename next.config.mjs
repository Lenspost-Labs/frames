/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lenspost.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "lenspost.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "lenspost.b-cdn.net",
      }
    ],
  },
};

export default nextConfig;
