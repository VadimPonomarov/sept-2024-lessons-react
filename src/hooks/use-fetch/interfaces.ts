import {
  IUsersResponse as UR,
  IUsersSearch as US,
} from "@/interfaces/users.interfaces.ts";
import {
  IPostsResponse as PR,
  IPostsSearch as PS,
} from "@/interfaces/posts.interfaces.ts";
import React from "react";

type CS = US | PS;

export interface IUserProps {
  params?: Partial<CS> | {};
  set: React.Dispatch<React.SetStateAction<UR | undefined>>;
  cb: (params?: Partial<CS>) => Promise<UR | undefined>;
}

export interface IPostProps {
  params?: Partial<CS> | {};
  set: React.Dispatch<React.SetStateAction<PR | undefined>>;
  cb: (params?: Partial<CS>) => Promise<PR | undefined>;
}

export interface IProps<T> {
  params?: Partial<CS> | {};
  set: React.Dispatch<React.SetStateAction<T>>;
  cb: (params?: Partial<CS>) => Promise<T>;
}
