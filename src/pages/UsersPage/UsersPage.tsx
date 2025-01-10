import { FC, useState } from "react";
import { apiUsers } from "@/api/apiUsers.ts";
import { IUsersResponse } from "@/interfaces/users.interfaces.ts";
import { UserCard } from "@/components/UserCard/UserCard.tsx";
import { useSearchParams } from "react-router-dom";
import { PaginationComponent } from "@/components/PaginationComponent/PaginationComponent.tsx";
import useFetch from "@/hooks/use-fetch/useFetch.tsx";

type IProps = object;

export const UsersPage: FC<IProps> = () => {
  const [params] = useSearchParams() ;
  const [users, setUsers] = useState<IUsersResponse | undefined>(undefined);
  useFetch({params, set: setUsers, cb: apiUsers.users});

  return (
    <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      <div className={"fixed z-40 w-full"}>
        {users && <PaginationComponent total={Number(users.total)} />}
      </div>
      <div
        className={
          "absolute top-[60px] flex w-full flex-wrap justify-evenly gap-2"
        }
      >
        {users &&
          users.users.map((item) => <UserCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};
