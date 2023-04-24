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
        source: '/member.html',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/about-us.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/golf--leauges.html',
        destination: '/',
        permanent: false,
      },
      {
        source: '/clubhouse--bar.html',
        destination: '/',
        permanent: false,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig
