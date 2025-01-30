import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import { TestDrawer } from "@/components/All/Drawer/TestDrawer.tsx";
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
  const isXs = useMediaQuery({ maxWidth: 768 });
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (isXs) {
      return;
    }
    navigate("/users/" + item.id);
  };
  const handleClickToAuth = () => {
    dispatch(iniActions.setCurrentUserById(item.id));
    useDebounce(navigate("/auth"), 500);
  };

  return (
    <div className={"relative"}>
      <span className={styles.btn_container}>
        <TestDrawer userId={"" + item.id} />
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
          <p className={"text-small"}>{item.email}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
