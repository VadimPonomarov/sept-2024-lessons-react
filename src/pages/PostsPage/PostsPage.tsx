import { FC, useState } from "react";

import { apiPosts } from "@/api/apiPosts.ts";
import useFetch from "@/common/hooks/use-fetch/useFetch.tsx";
import { IPostsResponse } from "@/common/interfaces/posts.interfaces.ts";
import { PostCard } from "@/components/PostCard/PostCard.tsx";

type IProps = object;

export const PostsPage: FC<IProps> = () => {
  const [posts, setPosts] = useState<IPostsResponse | undefined>(undefined);
  useFetch({ set: setPosts, cb: apiPosts.posts });

  return (
    <div className={"mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      {posts &&
        posts.posts.map((item) => <PostCard key={item.id} item={item} />)}
    </div>
  );
};
