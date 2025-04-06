/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Updated from serverActions: true to match Next.js 15.x format
    serverActions: {
      allowedOrigins: ['localhost:3003', 'cybertrainer.in']
    },
  },

  // Optimize for Netlify hosting
  output: 'standalone',
  poweredByHeader: false,

  // Improve performance
  compress: true,
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cybertrainer.in',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // ESLint configuration
  eslint: {
    // Warning instead of error during build
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    // Warning instead of error during build
    ignoreBuildErrors: true,
  },

  // Only include essential pages
  pageExtensions: ['tsx', 'ts'],

  // Redirects for removed pages
  async redirects() {
    return [
      {
        source: '/dashboard/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/',
        permanent: false,
      },
      {
        source: '/signup',
        destination: '/',
        permanent: false,
      },
      {
        source: '/register',
        destination: '/',
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/profile/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
