import { FC } from "react";
import { IFamily } from "@/assets/interfaces.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

interface IProps {
  item: IFamily;
}

export const SimpsonsCard: FC<IProps> = ({ item }) => {
  return (
    <Card className={"card xs:w-1 sm:w-[40%] md:w-1/4 lg:w-1/5 xl:w-1/6"}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.surname}</CardDescription>
      </CardHeader>
      <CardContent>
        <img className={"card-img"} src={item.photo} alt={item.name} />
        <p className={"card-content"}>{item.info}</p>
      </CardContent>
      <CardFooter>
        <p>Years old: {item.age}</p>
      </CardFooter>
    </Card>
  );
};
