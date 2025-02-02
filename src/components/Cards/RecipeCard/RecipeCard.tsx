import { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { v4 as uuidv4 } from "uuid";
import { IProps } from "./interfaces";
import useUniversalFilter from "@/components/All/FilterInput/useUniversalFilter";
import { IRecipe } from "@/common/interfaces/recipe.interfaces.ts";
import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import { iniSlice } from "@/store/slises/Ini/iniSlice.ts";

export const RecipeCard: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleInputChange } = useUniversalFilter<IRecipe>({
    queryKey: ["recipes", location.pathname, location.search],
    filterKeys: ["tags"],
    targetArrayKey: "recipes",
    cb: (data: IRecipe[]) => dispatch(iniSlice.actions.setFilteredRecipes(data)),
  });

  const handleOnClickTag = (event: React.MouseEvent, tag: string) => {
    event.stopPropagation();
    handleInputChange("tags", tag);
    console.log(handleInputChange);
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
              .map(tag => (
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
