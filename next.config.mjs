/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.extensions.push(".js", ".json", ".ts", ".tsx");
    return config;
  },
};

export default nextConfig;
