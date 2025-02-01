import { getAxios } from "@/api/axios/getAxios.ts";
import useInterceptors from "@/api/interseptors/useInterceptors.tsx";
import { baseUrl } from "@/common/constants/constants.ts";
import {
  IRecipeResponse,
  IRecipeSearch,
} from "@/common/interfaces/recipe.interfaces.ts";

const useApiRecipes = () => {
  const [apiRecipes] = useInterceptors(getAxios(baseUrl));

  const apiRecipesService = {
    recipes: async (params?: Partial<IRecipeSearch>): Promise<IRecipeResponse> => {
      try {
        const qParams = new URLSearchParams(params as Record<string, string>);
        const response = await apiRecipes.get(baseUrl + "/auth/" + "recipes", {
          params: qParams,
        });
        return await response.data;
      } catch (e) {
        console.log(e);
      }
    },
  };
  return { apiRecipesService };
};

export default useApiRecipes;
