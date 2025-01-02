const baseUrl = import.meta.env.VITE_API_URL || "https://dummyjson.com";
export const todoService = {
  todos: () =>
    fetch(baseUrl + "/" + "todos").then((response) => response.json()),
  todoById: (id: string) =>
    fetch(baseUrl + "/" + "todos" + id).then((response) => response.json()),
};
