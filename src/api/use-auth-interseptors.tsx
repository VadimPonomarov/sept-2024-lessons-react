import { AxiosInstance } from "axios";

import { baseUrl } from "@/common/constants/constants.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

const useAuthInterseptors = (apiInstance: AxiosInstance) => {
  const { accessToken, refreshToken } = useAppSelector((state) => state.ini);
  const dispatch = useAppDispatch();

  if (accessToken) {
    apiInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers.credenentials = true;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  if (refreshToken) {
    apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const body = {
              refreshToken,
              expiresInMins: 30,
            };
            const response = await apiInstance.post(
              baseUrl + "/auth/refresh",
              body,
            );

            dispatch(iniActions.setTokenPair(response.data));

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
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
  }

  return [apiInstance];
};

export default useAuthInterseptors;
