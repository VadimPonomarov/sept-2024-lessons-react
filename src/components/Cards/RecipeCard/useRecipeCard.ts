import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import useUniversalFilter from "@/components/All/FilterInput/useUniversalFilter";
import { IRecipe } from "@/common/interfaces/recipe.interfaces.ts";
import { iniSlice } from "@/store/slises/Ini/iniSlice.ts";

const useRecipeCard = () => {
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
  };

  return {
    navigate,
    handleOnClickTag,
  };
};

export default useRecipeCard;
