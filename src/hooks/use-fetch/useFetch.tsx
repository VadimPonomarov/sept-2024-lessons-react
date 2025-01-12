import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FetchProps } from "@/hooks/use-fetch/interfaces.ts";

const useFetch: FC<FetchProps<any>> = <T,>({ cb, set }: FetchProps<T>) => {
  const [urlSearchParams] = useSearchParams();

  const fetchData = async () => {
    const params = Object.fromEntries(urlSearchParams);
    const response = await cb(params);
    set(response);
  };

  useEffect(() => {
    fetchData();
  }, [urlSearchParams]);

  return null;
};

export default useFetch;
