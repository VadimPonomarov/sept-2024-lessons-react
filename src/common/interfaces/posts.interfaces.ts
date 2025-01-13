interface IReactions {
  likes: number;
  dislikes: number;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: IReactions;
  views: number;
  userId: number;
}

export interface IPostsSearch {
  total: string;
  skip: string;
  limit: string;
}

export interface IPostsResponse extends IPostsSearch {
  posts: IPost[];
}
