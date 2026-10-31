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
      {
        // Page zone « Taxi Chambourcy » supprimée : consolidée sur l'accueil (anti-cannibalisation).
        source: '/zones/taxi-chambourcy',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
