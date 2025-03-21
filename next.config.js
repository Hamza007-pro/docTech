/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'your-supabase-storage-domain.supabase.co',
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
      test: /\.pdf$/,
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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com",
              "worker-src blob: 'self'",
              "style-src 'self' 'unsafe-inline' https://unpkg.com",
              "img-src 'self' data: https://images.unsplash.com http://localhost:8000",
              "connect-src 'self' blob: https://unpkg.com http://localhost:8000",
              "frame-src 'self' blob:"
            ].join('; ')
          }
        ],
      }
    ];
  }
};

module.exports = nextConfig;
