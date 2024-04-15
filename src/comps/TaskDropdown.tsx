"use client";
import Link from "next/link";
import { useState } from "react";

interface TaskDropdownProps {
  categories: { id: number; name: string }[];
}
const TaskDropdown = ({ categories }: TaskDropdownProps) => {
  const [selectedCategory, setSelectedCategory] = useState(-1);
  return (
    <div className="flex items-center justify-start gap-2">
      <h1 className="text-lg font-bold">Sort: </h1>
      <select
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className="rounded-md p-2 text-black"
      >
        <option value="-1">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <Link
        className="rounded-md bg-green-300 p-2 text-black hover:bg-green-600"
        href={`/todo?category=${selectedCategory}`}
      >
        Go
      </Link>
    </div>
  );
};

export default TaskDropdown;
