import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

interface FetchProps<T> {
  cb: (params: Record<string, string>) => Promise<T>;
  set: (data: T) => void;
  queryKey: string;
}

export const useFetch = <T,>({ cb, set, queryKey }: FetchProps<T>): void => {
  const [urlSearchParams] = useSearchParams();
  const location = useLocation();
  const { data } = useQuery({
    queryKey: [queryKey, location.pathname, location.search],
    queryFn: async () => await cb(Object.fromEntries(urlSearchParams)),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      set(data);
    }
  }, [data, set]);

  return;
};
