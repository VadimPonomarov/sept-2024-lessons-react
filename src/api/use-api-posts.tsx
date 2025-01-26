import { getAxiosService } from "@/api/get-axios-service.ts";
import useAuthInterseptors from "@/api/use-auth-interseptors.tsx";
import { baseUrl } from "@/common/constants/constants.ts";
import { IPostsResponse } from "@/common/interfaces/posts.interfaces.ts";

const useApiPosts = () => {
  const [apiPosts] = useAuthInterseptors(getAxiosService(baseUrl));
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
