import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";

interface FetchProps<T> {
  cb: (params: Record<string, string>) => Promise<T>;
  set?: (data: T) => void;
  queryKey: string;
}

export const useFetch = <T,>({ cb, queryKey }: FetchProps<T>) => {
  const [urlSearchParams] = useSearchParams();
  const location = useLocation();
  const { isFetching, isSuccess, data } = useQuery<T>({
    queryKey: [queryKey, location.pathname, location.search],
    queryFn: async () => await cb(Object.fromEntries(urlSearchParams)),
    staleTime: Infinity,
  });

  return { data, isFetching, isSuccess };
};
