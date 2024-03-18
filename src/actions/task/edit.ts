"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { type ActionResponse } from "@/types/Response";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface EditTask {
  id: number;
  description: string;
  dueDate: Date;
  status: "completed" | "active";
  priorityLevel: number;
}

export default async function edit({
  id,
  description,
  dueDate,
  priorityLevel,
  status,
}: EditTask): Promise<ActionResponse> {
  try {
    if (!id) {
      throw new Error("Task id is required");
    }
    if (!description) {
      throw new Error("Task description is required");
    }
    await db
      .update(tasks)
      .set({
        description,
        dueDate,
        priorityLevel: priorityLevel.toString() as "1" | "2" | "3" | "4",
        status,
      })
      .where(eq(tasks.id, id));
    revalidatePath("/todo");
    return { msg: "Task edited successfully" };
  } catch (e: unknown) {
    const error = e as Error;
    return { error: "Error editing task: " + error.message };
  }
}
