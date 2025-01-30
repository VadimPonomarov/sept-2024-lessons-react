import { FC } from "react";

import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";
import { UserCard } from "@/components/Cards/UserCard/UserCard.tsx";
import { useUsersPage } from "./useUsersPage";
import styles from "./index.module.css";

export const UsersPage: FC = () => {
  const { isSuccess, users, total, lastElementRef } = useUsersPage();

  return (
    <div className={styles.container}>
      <div className={styles.fixedContainer}>
        {isSuccess && <PaginationComponent total={Number(total)} />}
      </div>
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
