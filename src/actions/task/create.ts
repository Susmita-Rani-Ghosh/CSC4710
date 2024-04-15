"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { type ActionResponse } from "@/types/Response";
import { Status } from "@/types/Status";
import { revalidatePath } from "next/cache";

interface CreateTask {
  description: string;
  dueDate: Date;
  priorityLevel: number;
  status?: Status;
  category?: number;
}

export default async function create({
  description,
  dueDate,
  priorityLevel,
  status,
  category,
}: CreateTask): Promise<ActionResponse> {
  try {
    if (!description) {
      throw new Error("Description is required");
    }
    await db.insert(tasks).values({
      // @ts-expect-error weird ts issue
      description,
      dueDate: dueDate as unknown as string,
      priorityLevel,
      status: status ?? "active",
      category: category == 0 ? null : category,
    });
    revalidatePath("/todo");
    return { msg: "Task created successfully" };
  } catch (e: unknown) {
    const error = e as Error;
    return { error: "Error creating task: " + error.message };
  }
}
