import { FC } from "react";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";
import { useUsersPage } from "./useUsersPage";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import UniversalFilter from "@/components/All/FilterInput/FilterInput.tsx";
import { IUser } from "@/common/interfaces/users.interfaces.ts";

export const UsersPage: FC = () => {
  const { isSuccess, users, lastElementRef } = useUsersPage();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.absoluteContainer}>
        <div className="w-screen flex items-center justify-center">
          <UniversalFilter<IUser>
            queryKey={["users", location.pathname, location.search]}
            filterKeys={["username", "lastName"]}
          />
        </div>

        {isSuccess &&
          users.map((item, index) => (
            <div key={item.id} ref={index === users.length - 1 ? lastElementRef : null}>
              <UserCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
