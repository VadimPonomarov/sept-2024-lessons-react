import { useEffect } from "react";

import { getAxios } from "@/api/axios/getAxios.ts";
import useInterceptors from "@/api/interseptors/useInterceptors.tsx";
import { baseUrl } from "@/common/constants/constants.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/store/useApp.ts";
import {
  IDummyAuth,
  IDummyAuthLoginResponse,
  IDummyAuthMeResponse,
  IDummyAuthRefreshBody,
  IDummyAuthRefreshResponse,
} from "@/common/interfaces/dummy.interfaces.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

const useApiAuth = () => {
  const { accessToken, refreshToken } = useAppSelector(state => state.ini);
  const dispatch = useAppDispatch();
  const [apiPosts] = useInterceptors(getAxios(baseUrl));

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
    refresh: async (expiresInMins: number = 30): Promise<void> => {
      try {
        const body: IDummyAuthRefreshBody = {
          refreshToken,
          expiresInMins,
        };
        const response = await apiPosts.post<IDummyAuthRefreshResponse>(
          baseUrl + "/auth/refresh",
          body,
        );
        dispatch(iniActions.setTokenPair(response.data));
      } catch (e) {
        console.log(e);
      }
    },
    me: async (): Promise<void> => {
      try {
        const response = await apiPosts.get<IDummyAuthMeResponse>(
          baseUrl + "/auth/me",
          {
            headers: {
              credentials: true,
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        dispatch(iniActions.setMe(response.data));
      } catch (e) {
        console.log(e);
      }
    },
  };

  useEffect(() => {
    if (accessToken) {
      apiAuthService.me();
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return { apiAuthService };
};

export default useApiAuth;
