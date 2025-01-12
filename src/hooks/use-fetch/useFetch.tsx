import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface FetchProps<T> {
  cb: (params?: Record<string, string>) => Promise<T>;
  set: (data: T) => void;
}

const useFetch = <T,>({ cb, set }: FetchProps<T>): void => {
  const [urlSearchParams] = useSearchParams();

  const fetchData = async () => {
    const params = Object.fromEntries(urlSearchParams);
    const response = await cb(params);
    set(response);
  };

  useEffect(() => {
    fetchData();
  }, [urlSearchParams]);

  return;
};

export default useFetch;
