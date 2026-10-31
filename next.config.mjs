/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/reservation',
        destination: '/#reservation',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
