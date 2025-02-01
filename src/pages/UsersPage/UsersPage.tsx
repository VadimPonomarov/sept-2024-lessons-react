import { FC } from "react";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";
import { useUsersPage } from "./useUsersPage";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import UniversalFilter from "@/components/All/FilterInput/FilterInput.tsx";
import { IUser } from "@/common/interfaces/users.interfaces.ts";
import DialogModal from "@/common/HOC/DialogModal/DialogModal.tsx";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";
import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";

export const UsersPage: FC = () => {
  const { users, lastElementRef, total } = useUsersPage();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const cb = (items: IUser[]) => dispatch(iniActions.setFilteredUsers(items));

  return (
    <div className={styles.container}>
      <span className={"fixed top-[60px] z-50"}>
        <PaginationComponent total={Number(total)} />
      </span>
      <div className={styles.absoluteContainer}>
        <div className="w-screen flex items-center justify-center">
          <DialogModal label={"Filters"}>
            <UniversalFilter<IUser>
              queryKey={["users", location.pathname, location.search]}
              filterKeys={[
                "username",
                "firstName",
                "lastName",
                "email",
                "age",
                "gender",
                "role",
                "phone",
              ]}
              cb={cb}
              targetArrayKey="users"
            />
          </DialogModal>
        </div>

        {users.length > 0 &&
          users.map((item, index) => (
            <div key={item.id} ref={index === users.length - 1 ? lastElementRef : null}>
              <UserCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
