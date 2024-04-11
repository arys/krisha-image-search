/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/images/:slug*',
        destination: 'http://195.49.210.229:3005/images/:slug*',
      },
    ];
  }
};

export default nextConfig;
