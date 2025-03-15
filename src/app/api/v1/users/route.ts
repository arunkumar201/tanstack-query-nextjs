import { createApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
	const pathName = request.nextUrl.pathname.split("/");

	return createApiResponse(
		{
			message: "All Users",
			path: pathName,
			data: [
				{
					id: "1",
					first_name: "John",
					last_name: "Doe",
					email: "john@example.com",
					age: 30,
				},
			],
		},
		{
			status: 200,
		}
	);
}
