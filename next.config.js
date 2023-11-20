/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
    },
    basePath: process.env.NODE_ENV === "production" ? "/kp1" : "",
    assetPrefix: process.env.NODE_ENV === "production" ? "/kp1/" : "",
    redirects: async () => {
        return [
            {
                source: "/kp1",
                destination: "/kp1/login",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
