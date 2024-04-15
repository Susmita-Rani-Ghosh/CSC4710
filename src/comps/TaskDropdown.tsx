"use client";
import Link from "next/link";
import { useState } from "react";

interface TaskDropdownProps {
  categories: { id: number; name: string }[];
}
const TaskDropdown = ({ categories }: TaskDropdownProps) => {
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
      {selectedCategory < 0 && (
        <input
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedCategory(-1);
            // window.location.href = `/todo?date=${e.target.value}`;
          }}
          type="date"
          className="rounded-md p-2 text-black"
        />
      )}
      <Link
        className="rounded-md bg-green-300 p-2 text-black hover:bg-green-600"
        href={
          selectedCategory > -1
            ? `/todo?category=${selectedCategory}`
            : `/todo?date=${selectedDate ?? ""}`
        }
      >
        Go
      </Link>
    </div>
  );
};

export default TaskDropdown;
