/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['openweathermap.org'],
  },
  async redirects() {
    return [
      {
        source: '/contact-us.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/membership-information.html',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/golf--leauges.html',
        destination: '/',
        permanent: false,
      },
      {
        source: '/member.html',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig
