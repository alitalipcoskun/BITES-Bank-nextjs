/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
};

export default nextConfig;
