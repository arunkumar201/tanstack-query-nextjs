import { NextResponse } from "next/server";
import { ApiError } from "../errors/api-error";

export function errorHandler(error: unknown) {
	if (error instanceof ApiError) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.statusCode }
		);
	}

	console.error(error);
	return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
