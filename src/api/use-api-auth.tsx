import { getAxiosService } from "@/api/get-axios-service.ts";
import useAuthInterseptors from "@/api/use-auth-interseptors.tsx";
import { baseUrl } from "@/common/constants/constants.ts";
import {
  IDummyAuth,
  IDummyAuthMeResponse,
  IDummyAuthRefreshBody,
  IDummyAuthRefreshResponse,
} from "@/common/interfaces/dummy.interfaces.ts";
import { useAppDispatch } from "@/store/hooks/hooks.ts";
import { iniActions, iniSelectors } from "@/store/slises/Ini/iniSlice.ts";

const useApiPosts = () => {
  const dispatch = useAppDispatch();
  const [apiPosts] = useAuthInterseptors(getAxiosService(baseUrl));

  const apiPostsService = {
    login: async (credentials: IDummyAuth): Promise<void> => {
      try {
        const response = await apiPosts.post(baseUrl + "/auth", credentials);
        dispatch(iniActions.setTokenPair(response.data));
      } catch (e) {
        console.log(e);
      }
    },
    refresh: async (): Promise<IDummyAuthRefreshResponse> => {
      try {
        const body: IDummyAuthRefreshBody = {
          refreshToken: iniSelectors.refreshToken.toString(),
          expiresInMins: 30,
        };
        const response = await apiPosts.post(baseUrl + "/auth/refresh", body);
        return await response.data;
      } catch (e) {
        console.log(e);
      }
    },
    me: async (): Promise<IDummyAuthMeResponse> => {
      try {
        const response = await apiPosts.get(baseUrl + "/auth/me");
        return await response.data;
      } catch (e) {
        console.log(e);
      }
    },
  };

  return { apiPostsService };
};
export default useApiPosts;
