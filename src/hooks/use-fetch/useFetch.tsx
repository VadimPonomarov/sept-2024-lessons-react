import { FC } from "react";
import { useEffectOnce } from "@/hooks/useEffectOnce.tsx";
import { IUserProps, IPostProps } from "./interfaces.ts";

const UseFetchUser: FC<IUserProps> = ({ cb, params, set }) => {
  useEffectOnce(() => {
    (async () => {
      const response = await cb(params);
      set(response);
    })();
  });
  return null;
};

const UseFetchPost: FC<IPostProps> = ({ cb, params, set }) => {
  useEffectOnce(() => {
    (async () => {
      const response = await cb(params);
      set(response);
    })();
  });
  return null;
};

export { UseFetchUser, UseFetchPost };

