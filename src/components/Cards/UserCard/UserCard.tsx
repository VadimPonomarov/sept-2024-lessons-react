import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import { UserCartModal } from "@/components/All/UserCartModal/UserCartModal.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

import styles from "./index.module.css";
import { IProps } from "./interfaces";

export const UserCard: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    navigate(`/users/${item.id}`, { state: { user: item } });
  };
  const handleClickToAuth = () => {
    dispatch(iniActions.setCurrentUserById(item.id));
    useDebounce(navigate("/auth"), 500);
  };

  return (
    <div className={"relative"}>
      <span className={styles.btn_container}>
        <UserCartModal userId={"" + item.id} />
        <button type="button" className="bt m-2" onClick={handleClickToAuth}>
          Auth
        </button>
      </span>
      <Card className={styles.card} onClick={handleClick}>
        <CardHeader>
          <CardTitle>
            {item.id}: {item.firstName} {item.lastName}
          </CardTitle>
          <CardDescription>Age: {item.age}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{item.phone}</p>
        </CardContent>
        <CardFooter>
          <small className={"text-small"}>Username: {item.username}</small>
        </CardFooter>
        <CardFooter>
          <i>
            <p className={"text-small"}>{item.email}</p>
          </i>
        </CardFooter>
      </Card>
    </div>
  );
};
