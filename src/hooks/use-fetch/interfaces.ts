import { IUsersSearch as US } from "@/interfaces/users.interfaces.ts";
import { IPostsSearch as PS } from "@/interfaces/posts.interfaces.ts";
import React from "react";

type CS = US | PS;

export interface IProps<T> {
  params?: Partial<CS> | {};
  set: React.Dispatch<React.SetStateAction<T>>;
  cb: (params?: Partial<CS>) => Promise<T>;
}






