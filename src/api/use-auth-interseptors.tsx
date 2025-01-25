import { AxiosInstance } from "axios";

import { baseUrl } from "@/common/constants/constants.ts";
import { useAppDispatch } from "@/store/hooks/hooks.ts";
import { iniActions, iniSelectors } from "@/store/slises/Ini/iniSlice.ts";

const useAuthInterseptors = (apiInstance: AxiosInstance) => {
  const dispatch = useAppDispatch();

  apiInstance.interceptors.request.use(
    (config) => {
      if (iniSelectors.accessToken) {
        config.headers.Authorization = `Bearer ${iniSelectors.refreshToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const body = {
            refreshToken: iniSelectors.refreshToken.toString(),
            expiresInMins: 30,
          };
          const response = await apiInstance.post(
            baseUrl + "/auth/refresh",
            body,
          );

          dispatch(iniActions.setTokenPair(response.data));

          originalRequest.headers.Authorization = `Bearer ${iniSelectors.accessToken}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh error:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      console.error("Request error:", error);
      return Promise.reject(error);
    },
  );

  return [apiInstance];
};
export default useAuthInterseptors;
