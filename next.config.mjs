/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: false,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_ROOT || '/api'}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost'}:${process.env.NEXT_PUBLIC_API_PORT || '8080'}${process.env.NEXT_PUBLIC_API_ROOT || '/api'}/:path*`
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  }
};

export default nextConfig;
