/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
    },
    assetPrefix: process.env.NODE_ENV === "production" ? "/kp1/" : "",
    publicRuntimeConfig: {
        basePath: process.env.NEXT_PUBLIC_BASEPATH,
    },
};

module.exports = nextConfig;
