"use server";
import { db } from "@/db";
import { category } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function create({ name }: { name: string }) {
  try {
    await db.insert(category).values({ name });
    revalidatePath("/category");
    return { msg: "Category created successfully" };
  } catch (e: unknown) {
    const error = e as Error;
    return { error: "Error creating category: " + error.message };
  }
}
