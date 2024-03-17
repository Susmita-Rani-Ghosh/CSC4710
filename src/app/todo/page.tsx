import CreateTask from "@/comps/CreateTask";
import TaskCard from "@/comps/TaskCard";
import { db } from "@/db";
import { tasks } from "@/db/schema";

export default async function page() {
  const tasks = await db.query.tasks.findMany({
    orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
  });
  return (
    <div>
      <h1>Tasks</h1>
      <div className="grid auto-cols-max grid-flow-col">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            description={task.description}
            dueDate={task.dueDate}
            priorityLevel={task.priorityLevel?.toString()}
            status={task.status}
          />
        ))}
      </div>
      <CreateTask />
    </div>
  );
}
