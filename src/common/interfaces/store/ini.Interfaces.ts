import { IDummyAuthMeResponse } from "@/common/interfaces/dummy.interfaces.ts";
import { IUser } from "@/common/interfaces/users.interfaces.ts";
import { IComboBoxItem } from "@/components/All/ComboBox/interfaces.ts";
import { IRecipe } from "@/common/interfaces/recipe.interfaces.ts";

export interface IniState {
  accessToken?: string;
  refreshToken?: string;
  authMe?: IDummyAuthMeResponse;
  comboBoxItems?: IComboBoxItem[];
  usersAll?: IUser[];
  filteredUsers?: IUser[];
  filteredRecipes?: IRecipe[];
  currentUser?: IUser;
}
