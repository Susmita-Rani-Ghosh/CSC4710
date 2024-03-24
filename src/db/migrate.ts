import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
const dburl = process.env.DB_URL!;
if (!dburl) throw new Error("DB_URL env var is not set");
const sql = postgres(dburl);
const db = drizzle(sql);

const main = async () => {
  console.log("Migrating database...");
  await migrate(db, {
    migrationsFolder: "./src/db/drizzle",
  });
  console.log("Database migrated!");
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
