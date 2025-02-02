import { FC } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";

import styles from "./index.module.css";
import { IProps } from "./interfaces";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { v4 as uuidv4 } from "uuid";

export const RecipeCard: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleOnClickTag = (event: React.MouseEvent, tag: string) => {
    event.stopPropagation();
    console.log(tag);
  };
  return (
    <Card
      className={styles.card}
      onClick={() => navigate(`/recipes/${item.id}`, { state: { recipe: item } })}
    >
      <CardHeader>
        <CardTitle>
          {item.id}: {item.name} <br />
        </CardTitle>
        <CardDescription>UserId: {item.userId}</CardDescription>
        <CardDescription>
          Tags:{" "}
          <span className={"flex gap-1 flex-wrap mt-2"}>
            {String(item.tags)
              .split(",")
              .map(item => (
                <Button
                  key={uuidv4()}
                  variant={"outline"}
                  className={"h-auto w-auto p-0"}
                  onClick={e => handleOnClickTag(e, item)}
                >
                  {item}
                </Button>
              ))}
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
