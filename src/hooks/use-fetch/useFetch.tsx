import { FC } from "react";
import { useEffectOnce } from "@/hooks/useEffectOnce.tsx";
import { IProps } from "./interfaces.ts";

const UseFetch: FC<IProps> = ({ cb, params, set }) => {
  useEffectOnce(() => {
    (async () => {
      const response = await cb(params);
      set(response);
    })();
  });
  return null;
};

export default UseFetch;
