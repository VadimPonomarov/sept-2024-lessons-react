import { FC, useRef } from "react";
import { Link } from "react-router-dom";

import { ICar } from "@/common/interfaces/cars.interfaces.ts";
import CrudButtonGroup from "@/components/All/CrudButtonGroup/CrudButtonGroup.tsx";
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
  const linkRef = useRef(null);
  const onEditHandler = () => {
    linkRef.current.click();
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
      <span className={"hidden, absolute right-4 top-2"}>
        <Link
          to={`/cars/${item.id}`}
          state={{ car: item }}
          ref={linkRef}
          onClick={onEditHandler}
        />
        <CrudButtonGroup orientation="horizontal" onEdit={onEditHandler} />
      </span>
    </Card>
  );
};
