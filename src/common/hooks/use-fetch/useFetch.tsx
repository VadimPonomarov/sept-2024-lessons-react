import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface FetchProps<T> {
  cb: (params?: Record<string, string>) => Promise<T>;
  set: (data: T) => void;
}

const useFetch = <T,>({ cb, set }: FetchProps<T>): void => {
  const [urlSearchParams] = useSearchParams();

  const fetchData = useCallback(async () => {
    const params = Object.fromEntries(urlSearchParams);
    const response = await cb(params);
    set(response);
  }, [cb, set, urlSearchParams]);

  useEffect(() => {
    fetchData();
  }, [urlSearchParams, fetchData]);

  return;
};

export default useFetch;
