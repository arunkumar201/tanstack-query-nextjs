import { NextResponse } from "next/server";
import { getApiDocs } from "@/lib/api/swagger";

export async function GET() {
	console.debug("🚀 ~ file: route.ts ~ line 8 ~ GET ~ getApiDocs");
	return NextResponse.json(getApiDocs());
}
