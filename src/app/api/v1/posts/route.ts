import { createApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const pathName = request.nextUrl.pathname.split("/");

	return createApiResponse(
		{
			message: "All Posts",
			path: pathName,
			data: [
				{
					id: "1",
					title: "Post 1",
					body: "This is post 1",
					user_id: "1",
				},
			],
		},
		{
			status: 200,
		}
	);
}
