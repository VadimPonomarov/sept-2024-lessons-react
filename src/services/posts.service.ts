const baseUrl = import.meta.env.VITE_API_URL || "https://dummyjson.com";
export const todoService = {
  posts: () =>
    fetch(baseUrl + "/" + "posts").then((response) => response.json()),
  postsById: (id: string) =>
    fetch(baseUrl + "/" + "posts" + id).then((response) => response.json()),
  postsByUserId: (userId: string) =>
    fetch(baseUrl + "/" + "posts/user/" + userId).then((response) =>
      response.json(),
    ),
};
