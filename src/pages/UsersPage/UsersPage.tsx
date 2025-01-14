import { FC, memo, useState } from "react";

import { apiUsers } from "@/api/apiUsers.ts";
import useFetch from "@/common/hooks/use-fetch/useFetch.tsx";
import { IUsersResponse } from "@/common/interfaces/users.interfaces.ts";
import { PaginationComponent } from "@/components/PaginationComponent/PaginationComponent.tsx";
import { UserCard } from "@/components/UserCard/UserCard.tsx";

type IProps = object;
export const UsersPage: FC<IProps> = memo(() => {
  const [users, setUsers] = useState<IUsersResponse | undefined>(undefined);

  useFetch({ set: setUsers, cb: apiUsers.users });

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
});
