import { ITodo } from "@/services/interfaces.ts";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type IProps = {
  item: ITodo;
};

export const TodoComponent: FC<IProps> = ({ item }) => {
  return (
    <Card className={"w-[200px] bg-gradient-to-r from-blue-100 to-green-300"}>
      <CardHeader>
        <CardTitle>{item.id}</CardTitle>
        <CardDescription>{item.todo}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className={"text-black-900"}>{item.completed}</p>
      </CardContent>
    </Card>
  );
};
