import rehypeCodeTitles from "rehype-code-titles";
import rehypePrismPlus from "rehype-prism-plus";

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
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: "@mdx-js/loader",
            /** @type {import('@mdx-js/loader').Options} */
            options: {
              rehypePlugins: [rehypeCodeTitles, rehypePrismPlus],
            },
          },
        ],
      }
    );

    return config;
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};

export default nextConfig;
