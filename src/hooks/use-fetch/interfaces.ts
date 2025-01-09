import { IUsersResponse, IUsersSearch } from "@/interfaces/users.interfaces.ts";
import { IPostsResponse, IPostsSearch } from "@/interfaces/posts.interfaces.ts";
import React from "react";

export interface IProps {
  params?: Partial<IUsersSearch | IPostsSearch> | {};
  set: React.Dispatch<React.SetStateAction<IUsersResponse | undefined>> |
    React.Dispatch<React.SetStateAction<IPostsResponse | undefined>>
  cb: (
    params?: Partial<IUsersSearch | IPostsSearch>
  ) => Promise<IUsersResponse | IPostsResponse>;
}