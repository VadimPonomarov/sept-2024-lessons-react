import {FC, useCallback, useEffect, useState} from "react";
import {usersService} from "@/services/usersService.ts";
import {IUsersResponse} from "@/models/users.interfaces.ts";
import {UserCard} from "@/components/UserCard.tsx";
import {useSearchParams} from "react-router-dom";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";

type IProps = object;

export const UsersPage: FC<IProps> = () => {
    const [params] = useSearchParams();
    const [users, setUsers] = useState<IUsersResponse | undefined>(undefined);
    const getUsers = useCallback(
        async () => await usersService.users(Object.fromEntries(params)),
        [params],
    );

    useEffect(() => {
        (async () => {
            try {
                const response = (await getUsers()) as IUsersResponse;
                setUsers(response);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [getUsers]);

    return (
        <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
            <div className={"w-full fixed z-40"}>{users && <PaginationComponent total={Number(users.total)}/>}</div>
            <div className={"absolute top-[60px] w-full flex flex-wrap justify-evenly gap-2"}>{users &&
                users.users.map((item) => <UserCard key={item.id} item={item}/>)}</div>
        </div>
    );
};
