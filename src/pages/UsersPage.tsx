import { FC, useEffect, useState } from "react";
import { usersService } from "@/services/usersService.ts";
import { IUser } from "@/services/users.interfaces.ts";
import { UserCard } from "@/components/UserCard.tsx";

type IProps = object;

export const UsersPage: FC<IProps> = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => await usersService.users();

  useEffect(() => {
    (async () => {
      try {
        const { users } = await getUsers();
        setUsers(users);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className={"flex flex-wrap justify-evenly gap-2"}>
      {!!users.length &&
        users.map((item) => <UserCard key={item.id} item={item} />)}
    </div>
  );
};
