import { createApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";
import os from "os";

const startTime = Date.now();

export async function GET(request: NextRequest) {
	const pathName = request.nextUrl.pathname.split("/");

	const healthCheck = {
		uptime: Math.floor((Date.now() - startTime) / 1000),
		message: "OK",
		timestamp: new Date().toISOString(),
		memoryUsage: process.memoryUsage(),
		nodeVersion: process.version,
		os: process.platform,
		arch: process.arch,
		cpuCount: process.cpuUsage(),
		totalmem: os.totalmem(),
		freemem: os.freemem(),
		networkInterfaces: os.networkInterfaces(),
		hostname: os.hostname(),
		type: os.type(),
		platform: os.platform(),
		release: os.release(),
	};

	return createApiResponse(
		{
			...healthCheck,
			path: pathName,
		},
		{
			status: 200,
		}
	);
}
