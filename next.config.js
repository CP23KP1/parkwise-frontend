/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
    },
    basePath: "/kp1",
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: "/kp1/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
