import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const res = await db.query.tasks.findFirst({ where: eq(tasks.id, 1) });

  return new Response(res?.description ?? "null", { status: 200 });
}
