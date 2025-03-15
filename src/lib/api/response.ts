import { NextResponse } from "next/server";

type ApiResponse<T> = {
	data: T | null;
	error?: string;
	meta?: {
		page?: number;
		pageSize?: number;
		totalCount?: number;
		totalPages?: number;
	};
};

export function createApiResponse<T>(
	data: T | null,
	options?: {
		error?: string;
		status?: number;
		meta?: ApiResponse<T>["meta"];
	}
): NextResponse {
	const response: ApiResponse<T> = { data };

	if (options?.error) {
		response.error = options.error;
	}

	if (options?.meta) {
		response.meta = options.meta;
	}

	return NextResponse.json(response, { status: options?.status || 200 });
}
