const baseUrl = import.meta.env.VITE_API_URL || "https://dummyjson.com";
export const usersService = {
  users: () =>
    fetch(baseUrl + "/" + "users").then((response) => response.json()),
  userById: (userId: string) =>
    fetch(baseUrl + "/users/" + userId).then((response) => response.json()),
  userByIdCarts: (userId: string) =>
    fetch(baseUrl + "/users/" + userId + "/" + "carts").then((response) =>
      response.json(),
    ),
};
