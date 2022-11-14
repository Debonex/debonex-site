/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  output: "standalone",
  i18n: {
    locales: ["zh"],
    defaultLocale: "zh",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
