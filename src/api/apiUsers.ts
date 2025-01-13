import { baseUrl } from "@/common/constants/constants.ts";
import { IUser, IUsersResponse, IUsersSearch } from "@/common/interfaces/users.interfaces.ts";

export const apiUsers = {
  users: async (
    params?: Partial<IUsersSearch | undefined>,
  ): Promise<IUsersResponse | undefined> => {
    try {
      const qParams = new URLSearchParams(params as Record<string, string>);
      const response = await fetch(`${baseUrl}/users?${qParams.toString()}`);
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  },
  userById: async (userId: string): Promise<IUser | undefined> => {
    try {
      const response = await fetch(`${baseUrl}/users/${userId}`);
      return await response.json();
    } catch (e) {
      console.log(e)
    }
  },
  userByIdCarts: async (userId: string): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/users/${userId}/carts`);
      return await response.json();
    } catch (e) {
    }
  },
};
