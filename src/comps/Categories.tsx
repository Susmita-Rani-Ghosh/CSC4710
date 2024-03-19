"use client";
import create from "@/actions/category/create";
import { Button, Input } from "@nextui-org/react";
import React from "react";
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
    if (name) {
      const notif = toast.loading("Saving category...");
      try {
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
          autoClose: 8000,
        });
      }
    }
  };
  const handleEditCategory = (id: number) => () => {
    console.log("Edit category", id, categoryInputs[id]);
    // TODO: create this action
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
          <Button onClick={handleEditCategory(category.id)} className="w-[10%]">
            Save
          </Button>
        </div>
      ))}
      <Input
        ref={newRef}
        className="w-[90%]"
        placeholder="Create new category..."
      />
      <Button onClick={handleNewCategory} className="w-[10%]">
        Add
      </Button>
    </div>
  );
}
