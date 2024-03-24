import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export const sql = postgres(process.env.DB_URL!);

export const db = drizzle(sql, { schema });
