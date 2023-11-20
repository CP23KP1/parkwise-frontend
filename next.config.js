/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
    },
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: "https://capstone23.sit.kmutt.ac.th/kp1/:path*",
            },
        ];
    },
    assetPrefix: process.env.NODE_ENV === "production" ? "/kp1/" : "",
};

module.exports = nextConfig;
