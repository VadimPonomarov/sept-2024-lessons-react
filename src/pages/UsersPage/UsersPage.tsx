import { FC } from "react";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";
import { useUsersPage } from "./useUsersPage";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import UniversalFilter from "@/components/All/FilterInput/FilterInput.tsx";
import { IUser } from "@/common/interfaces/users.interfaces.ts";
import DialogModal from "@/components/All/DialogModal/DialogModal.tsx";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";
import { useAppDispatch } from "@/common/hooks/store/useApp.ts";

export const UsersPage: FC = () => {
  const { users, lastElementRef } = useUsersPage();
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.absoluteContainer}>
        <div className="w-screen flex items-center justify-center">
          <DialogModal label={"Filters"}>
            <UniversalFilter<IUser>
              queryKey={["users", location.pathname, location.search]}
              filterKeys={["username", "lastName"]}
              cb={(items: IUser[]) => dispatch(iniActions.setFilteredUsers(items))}
              targetArrayKey="users"
            />
          </DialogModal>
        </div>

        {users.length &&
          users.map((item, index) => (
            <div key={item.id} ref={index === users.length - 1 ? lastElementRef : null}>
              <UserCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
