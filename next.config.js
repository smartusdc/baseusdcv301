/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    output: 'export',
    images: {
      unoptimized: true,
    },
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
      return config;
    },
  }