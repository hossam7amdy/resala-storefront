const createNextIntlPlugin = require('next-intl/plugin')
const checkEnvVariables = require('./check-env-variables')

checkEnvVariables()

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'egteqixkhxbiexflwrpt.supabase.co',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
