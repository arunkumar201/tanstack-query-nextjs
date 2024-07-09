"use client";

import {
	QueryClient,
	QueryClientProvider,
	isServer,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 1000 * 30, // 30 seconds
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}
export const ReactQueryProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// Initialize a QueryClient instance and provide it to our application
	const [queryClient] = useState(() => getQueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>{" "}
			{/* Stream SSR data into the client */}
			{/* <ReactQueryDevtools initialIsOpen={true} /> */}
		</QueryClientProvider>
	);
};
