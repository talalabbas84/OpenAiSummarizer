/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
    NEXT_PUBLIC_LOCAL_FAN_API_KEY: process.env.NEXT_PUBLIC_LOCAL_FAN_API_KEY
  }
};

module.exports = nextConfig
