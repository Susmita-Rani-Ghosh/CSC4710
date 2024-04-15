"use server";
import { db } from "@/db";
import { category } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
interface EditCategory {
  id: number;
  name: string;
}
export default async function edit({ id, name }: EditCategory) {
  try {
    if (!id) {
      throw new Error("Category id is required");
    }
    if (!name) {
      throw new Error("Category name is required");
    }
    await db.update(category).set({ name }).where(eq(category.id, id));
    revalidatePath("/category");
    revalidatePath("/todo");
    return { msg: "Category saved." };
  } catch (e: unknown) {
    const error = e as Error;
    return { error: "Error creating category: " + error.message };
  }
}
