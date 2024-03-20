import TaskModal from "@/comps/TaskModal";
import TaskCard from "@/comps/TaskCard";
import { db } from "@/db";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function page() {
  const now = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    }),
  );
  const dueToday = await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.dueDate, now),
    orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
    with: {
      category: true,
    },
  });
  const dueTasks = await db.query.tasks.findMany({
    where: (tasks, { gt }) => gt(tasks.dueDate, now),
    orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
    with: {
      category: true,
    },
  });
  const overdueTasks = await db.query.tasks.findMany({
    where: (tasks, { lt }) => lt(tasks.dueDate, now),
    orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
    with: {
      category: true,
    },
  });
  const allCategories = await db.query.category.findMany({});
  return (
    <div>
      <h1>Due today</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {dueToday.length > 0
          ? dueToday.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                description={task.description}
                dueDate={task.dueDate}
                priorityLevel={task.priorityLevel?.toString()}
                status={task.status}
                category={task.category?.name}
                categories={allCategories}
              />
            ))
          : "No tasks due today"}
      </div>
      <h1>Due later</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {dueTasks.length > 0
          ? dueTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                description={task.description}
                dueDate={task.dueDate}
                priorityLevel={task.priorityLevel?.toString()}
                status={task.status}
                category={task.category?.name}
                categories={allCategories}
              />
            ))
          : "No tasks due later"}
      </div>
      <h1>Overdue</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {overdueTasks.length > 0
          ? overdueTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                description={task.description}
                dueDate={task.dueDate}
                priorityLevel={task.priorityLevel?.toString()}
                status={task.status}
                category={task.category?.name}
                categories={allCategories}
              />
            ))
          : "No overdue tasks"}
      </div>
      <TaskModal categories={allCategories} />
    </div>
  );
}
