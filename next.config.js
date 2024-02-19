/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
    },
    basePath: process.env.NEXT_PUBLIC_BASEPATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASEPATH,
    publicRuntimeConfig: {
        basePath: process.env.NEXT_PUBLIC_BASEPATH,
    },
};

module.exports = nextConfig;
