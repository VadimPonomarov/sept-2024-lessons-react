import { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

import styles from "./index.module.css";
import { IProps } from "./interfaces";

export const RecipeCard: FC<IProps> = ({ item }) => {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>
          {item.id}: {item.name}
        </CardTitle>
        <CardDescription>Tags: {item.tags}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{item.cuisine}</p>
      </CardContent>
      <CardFooter>
        <p className={styles.textSmall}>Views: {item.instructions}</p>
      </CardFooter>
    </Card>
  );
};
