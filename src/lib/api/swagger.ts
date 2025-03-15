import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
	const spec = createSwaggerSpec({
		apiFolder: "app/api",
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Next.js API",
				version: "1.0",
			},
			components: {
				securitySchemes: {
					BearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
			security: [{ BearerAuth: [] }],
		},
	});

	return spec;
};
