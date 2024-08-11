/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/discover/now_playing",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["image.tmdb.org"], // Add this line to allow images from image.tmdb.org
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
