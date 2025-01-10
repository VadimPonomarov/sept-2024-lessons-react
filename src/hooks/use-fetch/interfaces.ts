import { IUsersResponse as UR, IUsersSearch as US } from "@/interfaces/users.interfaces.ts";
import { IPostsResponse as PR, IPostsSearch as PS } from "@/interfaces/posts.interfaces.ts";
import React from "react";

type CR = UR | PR;
type CS = US | PS;
type SU<T> = (prevState: T | undefined) => T | undefined;
type T = CR | (UR & SU<PR>) | (SU<UR> & PR) | (SU<UR> & SU<PR>) | undefined;

export interface IProps {
  params?: Partial<CS> | {};
  set: React.Dispatch<React.SetStateAction<T>>;
  cb: (params?: Partial<CS>) => Promise<T>;
}


