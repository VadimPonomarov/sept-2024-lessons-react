import { FC, useState } from "react";

import useApiPosts from "@/api/use-api-posts.tsx";
import { useFetch } from "@/common/hooks/use-fetch/useFetch.tsx";
import { IPostsResponse } from "@/common/interfaces/posts.interfaces.ts";
import { PostCard } from "@/components/Cards/PostCard/PostCard.tsx";

type IProps = object;

export const PostsPage: FC<IProps> = () => {
  const { apiPostsService: apiPosts } = useApiPosts();
  const [posts, setPosts] = useState<IPostsResponse | undefined>(undefined);
  useFetch({ set: setPosts, cb: apiPosts.posts });

  return (
    <div className={"mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      {posts && posts.posts.map(item => <PostCard key={item.id} item={item} />)}
    </div>
  );
};
