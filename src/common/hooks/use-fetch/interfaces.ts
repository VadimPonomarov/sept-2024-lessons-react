import React from "react";

import { ICarsResponse as CR } from "@/common/interfaces/cars.interfaces.ts";
import {
  IPostsResponse as PR,
  IPostsSearch as PS,
} from "@/common/interfaces/recipe.interfaces.ts";
import {
  IUsersResponse as UR,
  IUsersSearch as US,
} from "@/common/interfaces/users.interfaces.ts";

type CS = US | PS;

export interface IUserProps {
  set: React.Dispatch<React.SetStateAction<UR | undefined>>;
  cb: (params?: Partial<CS>) => Promise<UR | undefined>;
}

export interface IPostProps {
  set: React.Dispatch<React.SetStateAction<PR | undefined>>;
  cb: (params?: Partial<CS>) => Promise<PR | undefined>;
}

export interface ICarProps {
  set: React.Dispatch<React.SetStateAction<CR | undefined>>;
  cb: () => Promise<CR | undefined>;
}

export interface IProps<T> {
  set: React.Dispatch<React.SetStateAction<T>>;
  cb: (params?: Partial<CS>) => Promise<T>;
}

export interface FetchProps<T> {
  cb: (params?: Record<string, string>) => Promise<T>;
  set: (data: T) => void;
}
