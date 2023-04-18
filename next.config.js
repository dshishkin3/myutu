/** @type {import('next').NextConfig} */

/** https://b.myutu.ru/backMT/webresources */
/** https://beta.myutu.ru/backMT/webresources */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  productionBrowserSourceMaps: true,
  env: {
    api_root: "https://beta.myutu.ru/backMT/webresources",
    api_root_v1: "https://beta.myutu.ru/v1/backMT/webresources",
    version: "2.0.2",
    TOKEN_NAME: "t",
  },

  images: {
    domains: [
      "storage.yandexcloud.net",
      "upload.myutu.ru",
      "testupload.storage.yandexcloud.net",
      "klike.net",
      "swiperjs.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  generateBuildId: async () => {
    return "c767d2ee6d5f1bb4b16d3850855cbcb2e030177657daadf8ca630175d2a29e9e";
  },
};

module.exports = nextConfig;