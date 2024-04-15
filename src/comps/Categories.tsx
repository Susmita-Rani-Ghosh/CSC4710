"use client";
import create from "@/actions/category/create";
import edit from "@/actions/category/edit";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";

interface CategoriesProps {
  categories: { id: number; name: string }[];
}

export default function Categories({ categories }: CategoriesProps) {
  const newRef = React.useRef<HTMLInputElement>(null);
  const [categoryInputs, setCategoryInputs] = React.useState<
    Record<number, string>
  >({});
  const handleNewCategory = async () => {
    const name = newRef.current?.value;

    const notif = toast.loading("Saving category...");
    try {
      if (!name) throw new Error("Category name is required");
      const data = await create({ name });
      toast.update(notif, {
        render: data.msg,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      const err = e as Error;
      toast.update(notif, {
        render: err.message,
        type: "error",
        isLoading: false,
        draggable: true,
        autoClose: 8000,
      });
    }
  };
  const handleEditCategory = (id: number) => async () => {
    const name = categoryInputs[id];
    const notif = toast.loading("Saving category...");
    try {
      if (!name) throw new Error("Category name is required");
      const data = await edit({ id, name });
      toast.update(notif, {
        render: data.msg,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      const err = e as Error;
      toast.update(notif, {
        render: err.message,
        type: "error",
        isLoading: false,
        draggable: true,
        autoClose: 8000,
      });
    }
  };
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="mb-1 flex">
          <Input
            className="w-[90%]"
            placeholder={`Category ID: ${category.id}`}
            onChange={(e) => {
              setCategoryInputs({
                ...categoryInputs,
                [category.id]: e.target.value,
              });
            }}
            defaultValue={category.name}
          />
          <Button
            onClick={handleEditCategory(category.id)}
            color="primary"
            className="w-[10%]"
          >
            Save
          </Button>
        </div>
      ))}
      <hr className="my-2 rounded-md border border-gray-700" />
      <Input
        ref={newRef}
        color="primary"
        className="w-full"
        placeholder="Create new category..."
      />
      <Button
        onClick={handleNewCategory}
        className="w-full bg-blue-600 text-white"
      >
        <BsPlus /> Add
      </Button>
    </div>
  );
}
