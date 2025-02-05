  /** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true, // 追加 (1)
  basePath: '/baseusdcv301', // 追加 (2)
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false // 追加 (3)
    };
    return config;
  },
}
