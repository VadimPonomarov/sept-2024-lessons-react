import { FC } from "react";

import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import { RecipeCard } from "@/components/Cards/RecipeCard/RecipeCard.tsx";
import { useRecipePage } from "./useRecipePage";
import styles from "./index.module.css";

type IProps = object;

export const RecipePage: FC<IProps> = () => {
  const { isSuccess, data, lastElementRef } = useRecipePage();

  return (
    <div className={styles.container}>
      <div className={styles.fixedContainer}>
        {isSuccess && <PaginationComponent total={Number(data.total)} />}
      </div>
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
