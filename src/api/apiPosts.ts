import { baseUrl } from "@/common/constants/constants.ts";
import { IPostsResponse } from "@/common/interfaces/posts.interfaces.ts";

export const apiPosts = {
  posts: async (): Promise<IPostsResponse> => {
    try {
      const response = await fetch(baseUrl + "/" + "posts");
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  },
};
