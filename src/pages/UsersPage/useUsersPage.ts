import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { apiUsers } from "@/api/apiUsers.ts";
import { useFetch } from "@/common/hooks/use-fetch/useFetch.tsx";
import { IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { useInfiniteScroll } from "@/pages/UsersCartPage/use-infinite-scroll.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/store/useApp.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

export const useUsersPage = () => {
  const [params, setParams] = useSearchParams();
  const skip = Number(params.get("skip") || "0");
  const limit = Number(params.get("limit") || "30");
  const dispatch = useAppDispatch();
  const { filteredUsers } = useAppSelector(state => state.ini);
  const { isFetching, isSuccess, data } = useFetch<IUsersResponse>({
    cb: apiUsers.users,
    queryKey: "users",
  });

  const users = useMemo(() => {
    return filteredUsers.length > 0 ? filteredUsers : data?.users || [];
  }, [filteredUsers, data]);

  const total = useMemo(() => {
    return data?.total || 0;
  }, [filteredUsers, data]);

  useEffect(() => {
    if (data) {
      dispatch(iniActions.setUsersAll(data.users));
      dispatch(iniActions.setFilteredUsers(data.users));
    }
  }, [data, dispatch]);

  const { lastElementRef } = useInfiniteScroll(
    isFetching,
    () => {
      setParams(prev => {
        const newParams = new URLSearchParams(prev);
        const currentLimit = Number(prev.get("limit") || "30");
        const newLimit = Math.min(currentLimit + limit, Number(total)); // Ограничиваем значение limit
        if (newLimit > currentLimit) {
          newParams.set("limit", String(newLimit));
        }
        return newParams;
      });
    },
    limit,
    20, // Автоскролл включен, если limit >= 20
  );

  useEffect(() => {
    setParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("skip", String(skip));
      newParams.set("limit", String(limit));
      return newParams;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit]);

  return {
    params,
    isFetching,
    isSuccess,
    users,
    total,
    lastElementRef,
  };
};
