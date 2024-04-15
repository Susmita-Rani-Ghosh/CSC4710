"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import moment from "moment";
import create from "@/actions/task/create";
import { toast } from "react-toastify";
import edit from "@/actions/task/edit";
import { type Status } from "@/types/Status";
import { type InferSelectModel } from "drizzle-orm";
import { type category } from "@/db/schema";
interface TaskModalProps {
  id?: number;
  status?: Status;
  dueDate?: Date;
  priorityLevel?: number;
  description?: string;
  category?: string;
  categories: InferSelectModel<typeof category>[];
}

export default function TaskModal(props: TaskModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [priorityLevel, setPriorityLevel] = React.useState(
    props.priorityLevel ?? 1,
  );
  const [dueDate, setDueDate] = React.useState<Date>(
    props.dueDate ?? moment().add(1, "days").toDate(),
  );
  const [description, setDescription] = React.useState<string>(
    props.description ?? "",
  );
  const statuses: Array<Status> = ["active", "completed"];
  const [status, setStatus] = React.useState<Status>(
    props.status ?? statuses[0]!,
  );
  const priority = React.useMemo(() => 4 - priorityLevel + 1, [priorityLevel]);
  const isEdit = React.useMemo(() => Boolean(props.id), [props]);
  const title = React.useMemo(
    () => (isEdit ? "Edit Task" : "Create Task"),
    [isEdit],
  );
  const [category, setCategory] = React.useState<number>(
    props.categories.find((c) => c.name === props.category)?.id ?? 0,
  );
  return (
    <>
      <Button onPress={onOpen}>{title}</Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-gray-800">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                  />
                  <Input
                    onChange={(e) => setDueDate(new Date(e.target.value))}
                    value={moment(dueDate)
                      .add(1, "days")
                      .toDate()
                      .toLocaleDateString("en-US")}
                    type="date"
                    label="Due Date"
                  />
                  <Input
                    type="range"
                    min={1}
                    max={4}
                    step={1}
                    value={priorityLevel.toString()}
                    onChange={(e) => setPriorityLevel(Number(e.target.value))}
                    label={`Priority Level: ${priority}`}
                  />
                  <Select
                    label="Status"
                    onChange={(e) => setStatus(e.target.value as Status)}
                    defaultSelectedKeys={[status]}
                    items={statuses}
                    className="text-black"
                  >
                    {statuses.map((s) => (
                      <SelectItem className="text-black" key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Category"
                    defaultSelectedKeys={[props.category! ?? "None"]}
                    onChange={(e) => setCategory(Number(e.target.value))}
                    items={props.categories.map((c) => c.name)}
                    className="text-black"
                  >
                    {[{ id: 0, name: "None" }, ...props.categories].map((c) => (
                      <SelectItem
                        className="text-black"
                        key={c.id}
                        value={c.name}
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    const t = toast.loading(`Saving task...`);
                    try {
                      let data;
                      if (isEdit) {
                        if (!props.id) throw new Error("Task id is required");
                        console.log(category, props.category);
                        data = await edit({
                          id: props.id,
                          description,
                          dueDate,
                          priorityLevel: priority,
                          status,
                          category,
                        });
                      } else {
                        data = await create({
                          description,
                          dueDate,
                          priorityLevel: priority,
                          status,
                          category,
                        });
                      }
                      if (data.error) throw new Error(data.error);
                      toast.update(t, {
                        render: data.msg,
                        type: "success",
                        autoClose: 5000,
                        draggable: true,
                        isLoading: false,
                      });
                      onClose();
                    } catch (e: unknown) {
                      const err = e as Error;
                      toast.update(t, {
                        render: err.message,
                        type: "error",
                        autoClose: 7500,
                        draggable: true,
                        isLoading: false,
                      });
                    }
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
