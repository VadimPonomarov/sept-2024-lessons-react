import { baseUrl } from "@/constants/constants.ts";
import { IPostsResponse } from "@/interfaces/posts.interfaces.ts";

export const apiPosts = {
  posts: async (): Promise<IPostsResponse | undefined> => {
    try {
      const response = await fetch(baseUrl + "/" + "posts");
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  },
};
