import { createApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id: user_id } = await params;
	const path = request.nextUrl.pathname.split("/");

	return createApiResponse(
		{ id: user_id, path, message: `user_id:${user_id}` },
		{ status: 200 }
	);
}
