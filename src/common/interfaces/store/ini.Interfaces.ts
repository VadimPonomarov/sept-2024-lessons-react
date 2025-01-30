import { IDummyAuthMeResponse } from "@/common/interfaces/dummy.interfaces.ts";
import { IComboBoxItem } from "@/components/All/ComboBox/interfaces.ts";
import { IUser } from "@/common/interfaces/users.interfaces.ts";

export interface IniState {
  accessToken?: string;
  refreshToken?: string;
  authMe?: IDummyAuthMeResponse;
  comboBoxItems?: IComboBoxItem[];
  usersAll?: IUser[];
  currentUser?: IUser;
}
