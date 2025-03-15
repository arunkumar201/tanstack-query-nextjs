import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createCsrfMiddleware } from "@edge-csrf/nextjs";

const csrfMiddleware = createCsrfMiddleware({
	cookie: {
		secure: process.env.NODE_ENV === "production",
	},
});

export async function middleware(request: NextRequest) {
	const csrfResponse = await csrfMiddleware(request);

	if (csrfResponse) {
		return csrfResponse;
	}

	if (
		request.nextUrl.pathname.startsWith("/api/v1/") &&
		!request.nextUrl.pathname.startsWith("/api/v1/auth/")
	) {
		const token = request.headers.get("authorization")?.split(" ")[1];

		//disable auth for now
		if (token) {
			return NextResponse.json(
				{ error: "Authentication required" },
				{ status: 401 }
			);
		}

		try {
			return NextResponse.next();
		} catch (error) {
			return NextResponse.json({ error: "Invalid token" }, { status: 401 });
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/:path*", "/((?!_next/static|favicon.ico|api/auth).*)"],
};
