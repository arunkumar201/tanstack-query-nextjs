import { NextRequest } from "next/server";

type Handler = (req: NextRequest, context?: any) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
	return async (req, context) => {
		const token = req.cookies.get("token")?.value;
		if (!token) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		return handler(req, context);
	};
}
