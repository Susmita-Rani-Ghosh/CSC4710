import CreateTask from "@/comps/CreateTask";
import TaskCard from "@/comps/TaskCard";
import { db } from "@/db";

export default async function page() {
  const allTasks = await db.query.tasks.findMany({
    where: (tasks, { gt }) => gt(tasks.dueDate, new Date()),
    orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
    with: {
      category: true,
    },
  });
  return (
    <div>
      <h1>Tasks</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {allTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            description={task.description}
            dueDate={task.dueDate}
            priorityLevel={task.priorityLevel?.toString()}
            status={task.status}
            category={task.category?.name}
          />
        ))}
      </div>
      <CreateTask />
    </div>
  );
}
