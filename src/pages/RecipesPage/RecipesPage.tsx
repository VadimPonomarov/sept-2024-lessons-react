import { FC } from "react";
import { RecipeCard } from "@/components/Cards/RecipeCard/RecipeCard.tsx";
import { useRecipePage } from "./useRecipePage";
import styles from "./index.module.css";
import DialogModal from "@/common/HOC/DialogModal/DialogModal.tsx";
import UniversalFilter from "@/components/All/FilterInput/FilterInput.tsx";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";
import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import { IRecipe } from "@/common/interfaces/recipe.interfaces.ts";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";

type IProps = object;

export const RecipesPage: FC<IProps> = () => {
  const { recipes, lastElementRef, total } = useRecipePage();
  const dispatch = useAppDispatch();
  const cb = (items: IRecipe[]) => dispatch(iniActions.setFilteredRecipes(items));
  return (
    <div className={styles.container}>
      <span className={"fixed top-[60px] z-50"}>
        <PaginationComponent total={Number(total)} />
      </span>
      <div className="w-screen flex items-center justify-center">
        <DialogModal label={"Filters"}>
          <UniversalFilter<IRecipe>
            queryKey={["recipes", location.pathname, location.search]}
            filterKeys={["name", "tags", "userId"]}
            cb={cb}
            targetArrayKey="recipes"
          />
        </DialogModal>
      </div>
      <div className={styles.absoluteContainer}>
        {recipes &&
          recipes.map((item, index) => (
            <div
              key={item.id}
              ref={index === recipes.length - 1 ? lastElementRef : null}
            >
              <RecipeCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
