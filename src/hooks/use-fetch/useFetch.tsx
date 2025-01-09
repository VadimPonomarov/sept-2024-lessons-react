import { FC } from "react";
import { useEffectOnce } from "@/hooks/useEffectOnce.tsx";
import { IProps } from "./interfaces.ts";

const UseFetch: FC<IProps> = ({ cb, params = {}, set }) => {
  useEffectOnce(() => {
    const fetch = async () => {
      const response = await cb(params);
      set(response);
    };
    fetch();
  });
  return <></>;
};

export default UseFetch;
