/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    RECAPTCHA_PUBLIC_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.NEXT_PRIVATE_RECAPTCHA_SECRET_KEY
};

export default nextConfig;
