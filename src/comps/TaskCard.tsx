import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Link,
} from "@nextui-org/react";
import TaskModal from "./TaskModal";
import {
  BsBellFill,
  BsHash,
  BsClockFill,
  BsStarFill,
  BsCheck,
  BsX,
} from "react-icons/bs";
import { type Status } from "@/types/Status";
import { type InferSelectModel } from "drizzle-orm";
import { type category } from "@/db/schema";
import moment from "moment";
import { set } from "zod";
interface TaskCardProps {
  id: number;
  description: string;
  category?: string;
  dueDate: Date;
  priorityLevel?: string;
  status: Status;
  categories: InferSelectModel<typeof category>[];
  className?: string;
}

export default function TaskCard(props: TaskCardProps) {
  const isCompleted = props.status === "completed";
  return (
    <Card
      className={`min-w-[300px] md:max-w-[400px] ${isCompleted && "bg-green-200"} ${props.className}`}
    >
      <CardHeader className="flex gap-3">
        <div className="flex gap-3">
          <TaskModal
            id={props.id}
            description={props.description}
            dueDate={props.dueDate}
            priorityLevel={4 - parseInt(props.priorityLevel ?? "") + 1}
            status={props.status}
            category={props.category}
            categories={props.categories}
          />
          <Chip
            startContent={<BsBellFill size={18} />}
            className="p-2 py-5"
            variant="flat"
            color="secondary"
          >
            Priority: <span className="font-bold">{props.priorityLevel}</span>
          </Chip>
          {props?.category && (
            <Chip
              startContent={<BsHash size={18} />}
              color="primary"
              variant="flat"
              className="p-2 py-5"
            >
              {props?.category}
            </Chip>
          )}
          <div className="flex gap-1"></div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <b>Due</b>: {moment(props.dueDate).toDate().toDateString()}
        <Chip
          startContent={<BsClockFill size={18} />}
          color="success"
          variant="flat"
          className="p-2 py-5"
        >
          {!moment(props.dueDate).fromNow().includes("minute") &&
          !moment(props.dueDate).fromNow().includes("hour") ? (
            moment(props.dueDate).fromNow()
          ) : (
            <Link href="#">{moment(props.dueDate).fromNow()}</Link>
          )}
        </Chip>
        <Chip
          startContent={isCompleted ? <BsCheck size={18} /> : <BsX size={18} />}
          color="warning"
          variant="flat"
          className="p-2 py-5"
        >
          {isCompleted ? "Completed" : "Active"}
        </Chip>
      </CardFooter>
    </Card>
  );
}
