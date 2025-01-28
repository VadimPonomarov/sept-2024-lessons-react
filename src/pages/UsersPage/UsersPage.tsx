import {FC, memo, useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";

import {apiUsers} from "@/api/api-users.ts";
import {useFetch} from "@/common/hooks/use-fetch/useFetch.tsx";
import {PaginationComponent} from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import {UserCard} from "@/components/Cards/UserCard/UserCard.tsx";
import {IUsersResponse} from "@/common/interfaces/users.interfaces.ts";

type IProps = object;
export const UsersPage: FC<IProps> = memo(() => {
    const [params, setParams] = useSearchParams();
    const limit = Number(params.get("limit") || "30");
    const {isFetching, isSuccess, data} = useFetch<IUsersResponse>({
        cb: apiUsers.users,
        queryKey: "users",
    });

    const users = data?.users || [];
    const total = data?.total || 0;
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching) {
            console.log("Достигнут конец документа");
            setParams(prev => {
                const newParams = new URLSearchParams(prev);
                const newLimit = Math.min(limit + 30, +total); // Ограничиваем значение limit
                if (newLimit > limit) {
                    newParams.set("limit", String(newLimit));
                }
                return newParams;
            });
        }
    };

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(handleObserver);
        if (lastElementRef.current) observer.current.observe(lastElementRef.current);
        return () => observer.current?.disconnect();
    }, [isFetching]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(handleObserver);
        if (lastElementRef.current) observer.current.observe(lastElementRef.current);
        return () => observer.current?.disconnect();
    }, [users]);

    return (
        <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
            <div className={"fixed z-40 w-full"}>
                {isSuccess && <PaginationComponent total={Number(total)}/>}
            </div>
            <div className={"absolute top-[60px] flex w-full flex-wrap justify-evenly gap-2"}>
                {isSuccess && users.map((item, index) => (
                    <div key={item.id} ref={index === users.length - 1 ? lastElementRef : null}>
                        <UserCard item={item}/>
                    </div>
                ))}
            </div>
        </div>
    );
});









