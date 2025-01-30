import { FC } from "react";
import { RecipeCard } from "@/components/Cards/RecipeCard/RecipeCard.tsx";
import { useRecipePage } from "./useRecipePage";
import styles from "./index.module.css";

type IProps = object;

export const RecipePage: FC<IProps> = () => {
  const { data, lastElementRef } = useRecipePage();

  return (
    <div className={styles.container}>
      <div className={styles.absoluteContainer}>
        {data &&
          data?.recipes.map((item, index) => (
            <div
              key={item.id}
              ref={index === data?.recipes.length - 1 ? lastElementRef : null}
            >
              <RecipeCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
