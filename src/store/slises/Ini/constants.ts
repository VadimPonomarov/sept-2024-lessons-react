import { IniState } from "@/common/interfaces/store/ini.Interfaces.ts";

export const initialState: IniState = {
  accessToken: undefined,
  refreshToken: undefined,
  authMe: undefined,
  comboBoxItems: undefined,
  usersAll: undefined,
  filteredUsers: undefined,
  filteredRecipes: undefined,
  currentUser: undefined,
};
