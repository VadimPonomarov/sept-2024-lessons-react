const baseUrl = import.meta.env.VITE_API_URL || "https://dummyjson.com";
export const todoService = {
  users: () =>
    fetch(baseUrl + "/" + "users").then((response) => response.json()),
  userById: (id: string) =>
    fetch(baseUrl + "/" + "users" + id).then((response) => response.json()),
};
