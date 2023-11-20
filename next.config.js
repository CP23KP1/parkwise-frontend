/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
    },
    basePath: process.env.NODE_ENV === "production" ? "/kp1" : "",
    assetPrefix: process.env.NODE_ENV === "production" ? "/kp1/" : "",
};

module.exports = nextConfig;
