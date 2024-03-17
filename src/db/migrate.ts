import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
const dburl = process.env.DB_URL!;
if (!dburl) throw new Error("DB_URL env var is not set");
const sql = neon(dburl);
// @ts-expect-error weird lib type error
const db = drizzle(sql);

const main = async () => {
  console.log("Migrating database...");
  await migrate(db, {
    migrationsFolder: "./src/db/drizzle",
  });
  console.log("Database migrated!");
};

await main();
