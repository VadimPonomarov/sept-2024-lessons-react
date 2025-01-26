import { getAxiosService } from "@/api/get-axios-service.ts";
import useAuthInterseptors from "@/api/use-auth-interseptors.tsx";
import { baseUrl } from "@/common/constants/constants.ts";
import {
  IDummyAuth,
  IDummyAuthLoginResponse,
  IDummyAuthMeResponse,
  IDummyAuthRefreshBody,
  IDummyAuthRefreshResponse,
} from "@/common/interfaces/dummy.interfaces.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

const useApiAuth = () => {
  const { refreshToken } = useAppSelector((state) => state.ini);
  const dispatch = useAppDispatch();
  const [apiPosts] = useAuthInterseptors(getAxiosService(baseUrl));

  const apiAuthService = {
    login: async (credentials: IDummyAuth): Promise<void> => {
      try {
        const response = await apiPosts.post<IDummyAuthLoginResponse>(
          baseUrl + "/auth/login",
          credentials,
        );
        dispatch(iniActions.setTokenPair(response.data));
      } catch (e) {
        console.log(e);
      }
    },
    refresh: async (
      expiresInMins: number = 30,
    ): Promise<IDummyAuthRefreshResponse> => {
      try {
        const body: IDummyAuthRefreshBody = {
          refreshToken,
          expiresInMins,
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

  return { apiAuthService };
};
export default useApiAuth;
