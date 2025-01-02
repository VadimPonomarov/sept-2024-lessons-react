const baseUrl = import.meta.env.VITE_API_JPH || "https://dummyjson.com";
export const todoService = {
  todos: () =>
    fetch(baseUrl + "/" + "todos").then((response) => response.json()),
  todoById: (id: string) =>
    fetch(baseUrl + "/" + "todos" + id).then((response) => response.json()),
};
