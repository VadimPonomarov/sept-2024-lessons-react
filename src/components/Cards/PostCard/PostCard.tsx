import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { IProps } from "./interfaces";
import styles from "./index.module.css";

export const PostCard: FC<IProps> = ({ item }) => {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>
          {item.id}: {item.title}
        </CardTitle>
        <CardDescription>Tags: {item.tags}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{item.body}</p>
      </CardContent>
      <CardFooter>
        <p className={styles.textSmall}>Views: {item.views}</p>
      </CardFooter>
    </Card>
  );
};
