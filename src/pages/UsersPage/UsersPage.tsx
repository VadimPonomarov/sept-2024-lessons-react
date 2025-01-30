import { FC } from "react";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";
import { useUsersPage } from "./useUsersPage";
import styles from "./index.module.css";

export const UsersPage: FC = () => {
  const { isSuccess, users, lastElementRef } = useUsersPage();

  return (
    <div className={styles.container}>
      <div className={styles.absoluteContainer}>
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
