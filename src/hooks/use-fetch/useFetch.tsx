import { FC, useEffect } from "react";
import { useEffectOnce } from "@/hooks/useEffectOnce.tsx";
import { IUserProps, IPostProps } from "./interfaces.ts";
import { useSearchParams } from "react-router-dom";

const useFetchUser: FC<IUserProps> = ({ cb, set }) => {
  const [urlSearchParams] = useSearchParams();
  useEffect(() => {
    (async () => {
      const response = await cb(Object.fromEntries(urlSearchParams));
      set(response);
    })();
  }, [urlSearchParams]);
  return null;
};

const useFetchPost: FC<IPostProps> = ({ cb, params, set }) => {
  useEffectOnce(() => {
    (async () => {
      const response = await cb(params);
      set(response);
    })();
  });
  return null;
};

export { useFetchUser, useFetchPost };

