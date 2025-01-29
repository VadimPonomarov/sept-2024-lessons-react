import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {apiUsers} from "@/api/api-users.ts";
import {useFetch} from "@/common/hooks/use-fetch/useFetch.tsx";
import {PaginationComponent} from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import {UserCard} from "@/components/Cards/UserCard/UserCard.tsx";
import {IUsersResponse} from "@/common/interfaces/users.interfaces.ts";
import {useInfiniteScroll} from "@/pages/UsersCartPage/use-infinite-scroll.ts";

export const UsersPage: FC = () => {
    const [params, setParams] = useSearchParams();
    const skip = Number(params.get("skip") || "0");
    const limit = Number(params.get("limit") || "30");
    const {isFetching, isSuccess, data} = useFetch<IUsersResponse>({
        cb: apiUsers.users,
        queryKey: "users",
    });

    const users = data?.users || [];
    const total = data?.total || 0;

    const {lastElementRef} = useInfiniteScroll(
        isFetching,
        () => {
            setParams(prev => {
                const newParams = new URLSearchParams(prev);
                const currentLimit = Number(prev.get("limit") || "30");
                const newLimit = Math.min(currentLimit + limit, Number(total)); // Ограничиваем значение limit
                if (newLimit > currentLimit) {
                    newParams.set("limit", String(newLimit));
                }
                return newParams;
            });
        },
        limit,
        20 // Автоскролл включен, если limit >= 20
    );

    useEffect(() => {
        setParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("skip", String(skip));
            newParams.set("limit", String(limit));
            return newParams;
        });
    }, [skip, limit]);

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
};















