import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
} from "@nextui-org/react";
import CreateTask from "./CreateTask";
import { BsBellFill } from "react-icons/bs";

interface TaskCardProps {
  id: number;
  description: string;
  category?: string;
  dueDate: Date;
  priorityLevel?: string;
  status: string;
}

export default function TaskCard(props: TaskCardProps) {
  return (
    <Card className=" min-w-[300px] md:max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-3">
          <CreateTask
            id={props.id}
            description={props.description}
            dueDate={props.dueDate}
            priorityLevel={4 - parseInt(props.priorityLevel ?? "") + 1}
          />
          <Chip
            startContent={<BsBellFill size={18} />}
            className="p-2"
            variant="flat"
            color="secondary"
          >
            Priority: <span className="font-bold">{props.priorityLevel}</span>
          </Chip>
          <div className="flex gap-1">
            {props?.category && (
              <Chip color="primary" variant="flat">
                {props?.category}
              </Chip>
            )}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <b>Due</b>: {props.dueDate.toDateString()}
      </CardFooter>
    </Card>
  );
}
