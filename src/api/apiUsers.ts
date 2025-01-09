import { IUsersResponse, IUsersSearch } from "@/interfaces/users.interfaces";
import { baseUrl } from "@/constants/constants.ts";

export const apiUsers = {
  users: async (
    params?: Partial<IUsersSearch>,
  ): Promise<IUsersResponse | undefined> => {
    try {
      const qParams = new URLSearchParams(params as Record<string, string>);
      const response = await fetch(`${baseUrl}/users?${qParams.toString()}`);
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  },
};
