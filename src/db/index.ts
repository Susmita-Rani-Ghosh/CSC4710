import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const sql: NeonQueryFunction<boolean, boolean> = neon(
  process.env.DB_URL!,
);
export const db = drizzle(sql, { schema });
