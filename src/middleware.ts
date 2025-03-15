import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (
		request.nextUrl.pathname.startsWith("/api/v1/") &&
		!request.nextUrl.pathname.startsWith("/api/v1/auth/")
	) {
		const token = request.headers.get("authorization")?.split(" ")[1];

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
	matcher: "/api/:path*",
};
