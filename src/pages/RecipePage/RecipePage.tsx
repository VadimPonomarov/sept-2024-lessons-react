import { FC, useEffect } from "react";

import useApRecipes from "@/api/useApRecipes.ts";
import { useFetch } from "@/common/hooks/use-fetch/useFetch.tsx";
import { useSearchParams } from "react-router-dom";
import { useInfiniteScroll } from "@/pages/UsersCartPage/use-infinite-scroll.ts";
import { IRecipeResponse } from "@/common/interfaces/recipe.interfaces.ts";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import { RecipeCard } from "@/components/Cards/RecipeCard/RecipeCard.tsx";

type IProps = object;

export const RecipePage: FC<IProps> = () => {
  const [params, setParams] = useSearchParams();
  const skip = Number(params.get("skip") || "0");
  const limit = Number(params.get("limit") || "30");

  const { apiRecipesService: apiRecipes } = useApRecipes();
  const { isFetching, data, isSuccess } = useFetch<IRecipeResponse>({
    cb: apiRecipes.recipes,
    queryKey: "recipes",
  });

  const { lastElementRef } = useInfiniteScroll(
    isFetching,
    () => {
      setParams(prev => {
        const newParams = new URLSearchParams(prev);
        const currentLimit = Number(prev.get("limit") || "30");
        const newLimit = Math.min(currentLimit + limit, Number(data?.total)); // Ограничиваем значение limit
        if (newLimit > currentLimit) {
          newParams.set("limit", String(newLimit));
        }
        return newParams;
      });
    },
    limit,
    20,
  );

  useEffect(() => {
    setParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("skip", String(skip));
      newParams.set("limit", String(limit));
      return newParams;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit]);

  return (
    <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      <div className={"fixed z-40 w-full"}>
        {isSuccess && <PaginationComponent total={Number(data.total)} />}
      </div>
      <div className={"absolute top-[60px] flex w-full flex-wrap justify-evenly gap-2"}>
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
