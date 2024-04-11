/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/images',
        destination: 'http://195.49.210.229:3005/image-search',
      },
    ];
  }
};

export default nextConfig;
