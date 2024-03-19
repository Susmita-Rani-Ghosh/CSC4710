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
} from "@nextui-org/react";
import moment from "moment";
import create from "@/actions/task/create";
import { toast } from "react-toastify";
import edit from "@/actions/task/edit";

type Status = "completed" | "active";

interface TaskModalProps {
  id?: number;
  status?: Status;
  dueDate?: Date;
  priorityLevel?: number;
  description?: string;
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
  const [status, setStatus] = React.useState<Status>(props.status ?? "active");
  const priority = React.useMemo(() => 4 - priorityLevel + 1, [priorityLevel]);
  const isEdit = React.useMemo(() => Boolean(props.id), [props]);
  const title = React.useMemo(
    () => (isEdit ? "Edit Task" : "Create Task"),
    [isEdit],
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
                    value={
                      dueDate.toISOString().split("T")[0]?.toString() ?? ""
                    }
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
                  <select
                    onChange={(e) => setStatus(e.target.value as Status)}
                    className="rounded-xl bg-gray-200 p-4 text-gray-700"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
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
                        data = await edit({
                          id: props.id,
                          description,
                          dueDate,
                          priorityLevel: priority,
                          status,
                        });
                      } else {
                        data = await create({
                          description,
                          dueDate,
                          priorityLevel: priority,
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
