import { createApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id: post_id } = await params;
	const path = request.nextUrl.pathname.split("/");

	return createApiResponse(
		{ id: post_id, path, message: `post_id:${post_id}` },
		{ status: 200 }
	);
}
