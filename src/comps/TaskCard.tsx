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

interface TaskCardProps {
  id: number;
  description: string;
  category?: string;
  dueDate: Date;
  priorityLevel?: string;
  status: string;
}

export const NotificationIcon = ({
  size,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) => {
  return (
    <svg
      fill="none"
      height={size ?? 24}
      viewBox="0 0 24 24"
      width={size ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function TaskCard(props: TaskCardProps) {
  return (
    <Card className=" min-w-[200px] md:max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-3">
          <CreateTask
            id={props.id}
            description={props.description}
            dueDate={props.dueDate}
            priorityLevel={parseInt(props.priorityLevel ?? "")}
          />
          <Chip
            startContent={<NotificationIcon size={20} />}
            variant="flat"
            color="secondary"
          >
            Priority: <span className="font-bold">{props.priorityLevel}</span>
          </Chip>
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