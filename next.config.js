/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Enable source maps in production for better debugging
  productionBrowserSourceMaps: false,
  
  // Optimize build
  poweredByHeader: false,
  compress: true,
  
  // Trailing slash configuration
  trailingSlash: false,
};

module.exports = nextConfig; 