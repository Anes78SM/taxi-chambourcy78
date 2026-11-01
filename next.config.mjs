/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Permissions-Policy', value: 'geolocation=(self), camera=(), microphone=()' },
        ],
      },
    ];
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
      {
        // Zone « Paris Ouest » repositionnée en hub régional « Yvelines (78) ».
        source: '/zones/taxi-paris-ouest',
        destination: '/zones/taxi-yvelines',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
