/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      'images.unsplash.com',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      }
    ],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp'],
  },
  webpack: (config) => {
    // Handle canvas dependency
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };

    // Configure asset handling
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp)$/i,
      type: 'asset/resource'
    });
    
    // Add PDF file handling
    config.module.rules.push({
      test: /\.(pdf|worker\.js)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext][query]'
      }
    });

    config.resolve.alias.canvas = false;

    return config;
  },
  // Security headers for resources
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://images.unsplash.com http://localhost:8000 blob:",
              "connect-src 'self' blob: http://localhost:* postgres://*:*",
              "frame-src 'self' blob:",
              "object-src 'self' blob:",
              "media-src 'self' blob:",
              "font-src 'self' data:",
            ].join('; ')
          }
        ],
      }
    ];
  }
};

module.exports = nextConfig;
