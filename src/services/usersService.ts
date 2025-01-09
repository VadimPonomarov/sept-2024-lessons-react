import { IUsersSearch } from "@/models/users.interfaces.ts";
import { baseUrl } from "@/constants/constants.common.ts";


export const usersService = {
  users: async (params: Partial<IUsersSearch>) => {
    const qParams = new URLSearchParams(params);
    const response = await fetch(baseUrl + "/" + "users?" + qParams.toString());
    return await response.json();
  },
  userById: (userId: string) =>
    fetch(baseUrl + "/users/" + userId).then((response) => response.json()),
  userByIdCarts: (userId: string) =>
    fetch(baseUrl + "/users/" + userId + "/" + "carts").then((response) =>
      response.json(),
    ),
};
