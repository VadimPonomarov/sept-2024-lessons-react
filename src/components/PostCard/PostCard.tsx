import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { IPost } from "@/interfaces/posts.interfaces.ts";

type IProps = {
  item: IPost;
};

export const PostCard: FC<IProps> = ({ item }) => {
  return (
    <Card className={"h-[200px] w-[300px] overflow-auto"}>
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
        <p className={"text-small"}>Views: {item.views}</p>
      </CardFooter>
    </Card>
  );
};
