/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/app.lenspost.xyz/",
        destination: "https://app.lenspost.xyz/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
