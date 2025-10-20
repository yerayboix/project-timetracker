import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { projects } from "./schema/project";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle({ client, schema: { projects } }); 