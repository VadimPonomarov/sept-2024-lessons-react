import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ICar } from "@/common/interfaces/cars.interfaces.ts";
import CrudButtonGroup from "@/components/CrudButtonGroup/CrudButtonGroup.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type IProps = { item: ICar };

export const CarCard: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();
  const onEditHandler = () => {
    navigate(`/cars/${item.id}`, { state: { car: item } });
  };
  return (
    <Card className="relative h-[200px] w-[300px] overflow-auto">
      <CardHeader>
        <CardTitle>{item.brand}</CardTitle>
        <CardDescription>Year: {item.year}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Price: {item.price}</p>
      </CardContent>
      <CardFooter>
        <p className="text-small">Id: {item.id}</p>
      </CardFooter>
      <span className={"absolute right-4 top-2"}>
        <CrudButtonGroup orientation="horizontal" onEdit={onEditHandler} />
      </span>
    </Card>
  );
};
