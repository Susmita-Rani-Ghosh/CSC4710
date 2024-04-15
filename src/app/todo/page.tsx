import TaskModal from "@/comps/TaskModal";
import TaskCard from "@/comps/TaskCard";
import TaskDropdown from "@/comps/TaskDropdown"; // Import TaskDropdown component
import { db } from "@/db";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface TodoPage {
  searchParams?: Record<string, string | undefined>;
}

export default async function page({ searchParams }: TodoPage) {
  const dateParams = searchParams?.date;
  const now = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    }),
  );

  if (dateParams) {
    if (isNaN(new Date(dateParams).getDate())) {
      return <h1>Invalid date</h1>;
    }
    now.setDate(new Date(dateParams).getDate());
    now.setMonth(new Date(dateParams).getMonth());
    now.setFullYear(new Date(dateParams).getFullYear());
  }
  const category = searchParams?.category;
  let dueToday, dueTasks, overdueTasks;
  if (!category || category === "-1") {
    dueToday = await db.query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.dueDate, now),
      orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
      with: {
        category: true,
      },
    });
    dueTasks = await db.query.tasks.findMany({
      where: (tasks, { gt }) => gt(tasks.dueDate, now),
      orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
      with: {
        category: true,
      },
    });
    overdueTasks = await db.query.tasks.findMany({
      where: (tasks, { lt }) => lt(tasks.dueDate, now),
      orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
      with: {
        category: true,
      },
    });
  } else {
    if (isNaN(Number(category))) {
      return <h1>Invalid category</h1>;
    }
    dueToday = await db.query.tasks.findMany({
      where: (tasks, { eq, and }) =>
        and(eq(tasks.dueDate, now), eq(tasks.category, Number(category))),
      orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
      with: {
        category: true,
      },
    });

    dueTasks = await db.query.tasks.findMany({
      where: (tasks, { gt, and, eq }) =>
        and(gt(tasks.dueDate, now), eq(tasks.category, Number(category))),
      orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
      with: {
        category: true,
      },
    });

    overdueTasks = await db.query.tasks.findMany({
      where: (tasks, { lt, and, eq }) =>
        and(lt(tasks.dueDate, now), eq(tasks.category, Number(category))),
      orderBy: (tasks, { asc }) => [asc(tasks.priorityLevel)],
      with: {
        category: true,
      },
    });
  }
  const allCategories = await db.query.category.findMany({});

  overdueTasks.sort((a, b) => {
    return a.dueDate < b.dueDate ? -1 : 1;
  });

  return (
    <div>
      {/* Add TaskDropdown component */}
      <TaskDropdown categories={allCategories} />

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
