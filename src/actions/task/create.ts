"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { type ActionResponse } from "@/types/Response";
import { revalidatePath } from "next/cache";

interface CreateTask {
  description: string;
  dueDate: string;
  priorityLevel: number;
}

export default async function create({
  description,
  dueDate,
  priorityLevel,
}: CreateTask): Promise<ActionResponse> {
  try {
    await db.insert(tasks).values({
      // @ts-expect-error weird ts issue
      description,
      dueDate: dueDate,
      priorityLevel,
      status: "active",
    });
    revalidatePath("/todo");
    return { msg: "Task created successfully" };
  } catch (e: unknown) {
    const error = e as Error;
    return { error: "Error creating task: " + error.message };
  }
}
