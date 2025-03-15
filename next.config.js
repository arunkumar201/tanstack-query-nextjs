const { createSecureHeaders } = require("next-secure-headers");

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

	headers: createSecureHeaders({
		forceHTTPSRedirect: [
			true,
			{ maxAge: 60 * 60 * 24 * 365, includeSubDomains: true, preload: true },
		],
		contentSecurityPolicy: {
			reportOnly: true,
		},
		frameGuard: "sameorigin",
		expectCT: [true, { maxAge: 60 * 60 * 24 * 365, enforce: true }],
		referrerPolicy: "strict-origin-when-cross-origin",
		xssProtection: "block-rendering",
		nosniff: "nosniff",
	}),
};

module.exports = nextConfig;
