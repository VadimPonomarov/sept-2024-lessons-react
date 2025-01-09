import { baseUrl } from "@/constants/constants.common.ts";

export const postsService = {
  posts: () =>
    fetch(baseUrl + "/" + "posts").then((response) => response.json()),
  postsById: (id: string) =>
    fetch(baseUrl + "/posts/" + id).then((response) => response.json()),
  postsByUserId: (userId: string) =>
    fetch(baseUrl + "/posts/user/" + userId).then((response) =>
      response.json(),
    ),
};
