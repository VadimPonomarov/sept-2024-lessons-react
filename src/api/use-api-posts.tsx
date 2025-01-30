import { getAxiosService } from "@/api/getAxiosService.ts";
import useAuthInterceptors from "@/api/useAuthInterceptors.tsx";
import { baseUrl } from "@/common/constants/constants.ts";
import { IPostsResponse } from "@/common/interfaces/posts.interfaces.ts";

const useApiPosts = () => {
  const [apiPosts] = useAuthInterceptors(getAxiosService(baseUrl));
  // const apiPosts = getAxiosService(baseUrl);
  const apiPostsService = {
    posts: async (): Promise<IPostsResponse> => {
      try {
        const response = await apiPosts.get(baseUrl + "/auth/" + "posts");
        return await response.data;
      } catch (e) {
        console.log(e);
      }
    },
  };
  return { apiPostsService };
};

export default useApiPosts;
