/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["image.tmdb.org"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig
