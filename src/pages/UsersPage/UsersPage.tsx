import { FC, memo } from "react";

import { apiUsers } from "@/api/api-users.ts";
import { useFetch } from "@/common/hooks/use-fetch/useFetch.tsx";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";

type IProps = object;
export const UsersPage: FC<IProps> = memo(() => {
  const { data: users } = useFetch({
    cb: apiUsers.users,
    queryKey: "users",
  });

  return (
    <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      <div className={"fixed z-40 w-full"}>
        {users && <PaginationComponent total={Number(users.total)} />}
      </div>
      <div className={"absolute top-[60px] flex w-full flex-wrap justify-evenly gap-2"}>
        {users && users.users.map(item => <UserCard key={item.id} item={item} />)}
      </div>
    </div>
  );
});
