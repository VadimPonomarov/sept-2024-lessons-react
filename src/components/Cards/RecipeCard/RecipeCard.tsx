import { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import styles from "./index.module.css";
import { Button } from "@/components/ui/button.tsx";
import { v4 as uuidv4 } from "uuid";
import { IProps } from "./interfaces";
import useRecipeCard from "./useRecipeCard";
import { useLocation } from "react-router-dom";

export const RecipeCard: FC<IProps> = ({ item }) => {
  const { navigate, handleOnClickTag } = useRecipeCard();
  const location = useLocation();

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
          Tags:
          <span className={"flex gap-1 flex-wrap mt-2"}>
            {location.pathname.includes("recipes") &&
              item.tags.map((tag: string) => (
                <Button
                  key={uuidv4()}
                  variant={"outline"}
                  className={"h-auto w-auto p-0"}
                  onClick={e => handleOnClickTag(e, tag)}
                >
                  {tag}
                </Button>
              ))}
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
