import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
	path: "../../apps/web/.env",
});

export default defineConfig({
	schema: "./src/schema",
	out: "./src/migrations",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
		authToken: process.env.DATABASE_AUTH_TOKEN,
	},
});
