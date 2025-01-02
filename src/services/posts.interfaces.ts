interface IReactions {
  likes: number;
  dislikes: number;
}

export interface IUser {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: IReactions;
  views: number;
  userId: number;
}
