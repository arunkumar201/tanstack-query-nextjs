import "server-only";

import { NextRequest, NextResponse } from "next/server";

const redis: Record<string, string> = {};
const db = {
	get: async (key: string) => redis[key],
	set: async (key: string, value: string, ttl: number) => {
		redis[key] = value;
		setTimeout(() => delete redis[key], ttl * 1000);
	},
};

export async function rateLimit(request: NextRequest, limit = 60, window = 60) {
	const ip = request.headers.get("x-forwarded-for") || "unknown";
	const key = `rate-limit:${ip}:${request.nextUrl.pathname}`;

	const current = await db.get(key);
	const count = current ? parseInt(current, 10) : 0;

	if (count >= limit) {
		return NextResponse.json(
			{ error: "Too many requests" },
			{
				status: 429,
				headers: {
					"Retry-After": window.toString(),
				},
			}
		);
	}

	await db.set(key, (count + 1).toString(), window);

	return null;
}
