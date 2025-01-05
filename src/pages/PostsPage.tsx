import {FC, useEffect, useState} from "react";
import {postsService} from "@/services/postsService.ts";
import {IPost} from "@/models/posts.interfaces.ts";
import {PostCard} from "@/components/PostCard.tsx";

type IProps = object;

export const PostsPage: FC<IProps> = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const getUsers = async () => await postsService.posts();

    useEffect(() => {
        (async () => {
            try {
                const {posts} = await getUsers();
                setPosts(posts);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className={"mt-[40px] flex flex-wrap justify-evenly gap-2"}>
            {!!posts.length &&
                posts.map((item) => <PostCard key={item.id} item={item}/>)}
        </div>
    );
};
