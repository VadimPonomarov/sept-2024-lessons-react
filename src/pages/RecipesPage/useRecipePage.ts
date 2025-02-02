import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import useApiRecipes from "@/api/useApiRecipes.ts";
import { useFetch } from "@/common/hooks/use-fetch/useFetch.tsx";
import { useInfiniteScroll } from "@/pages/UsersCartPage/use-infinite-scroll.ts";
import { IRecipeResponse } from "@/common/interfaces/recipe.interfaces.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/store/useApp.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

export const useRecipePage = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { filteredRecipes } = useAppSelector(state => state.ini);
  const skip = Number(params.get("skip") || "0");
  const limit = Number(params.get("limit") || "30");

  const { apiRecipesService: apiRecipes } = useApiRecipes();
  const { isFetching, data, isSuccess } = useFetch<IRecipeResponse>({
    cb: apiRecipes.recipes,
    queryKey: "recipes",
  });

  const recipes = useMemo(() => {
    return filteredRecipes.length > 0 ? filteredRecipes : data?.recipes || [];
  }, [filteredRecipes, data]);

  const total = useMemo(() => {
    return data?.total || 0;
  }, [filteredRecipes, data]);

  useEffect(() => {
    if (data) {
      dispatch(iniActions.setFilteredRecipes(data.recipes));
    }
  }, [data, dispatch]);

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

  return {
    params,
    isFetching,
    isSuccess,
    recipes,
    lastElementRef,
    total,
  };
};
