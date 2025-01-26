import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import { IUser } from "@/common/interfaces/users.interfaces.ts";
import { TestDrawer } from "@/components/All/Drawer/TestDrawer.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type IProps = {
  item: IUser;
};

export const UserCard: FC<IProps> = ({ item }) => {
  const navigate = useNavigate();
  const isXs = useMediaQuery({ maxWidth: 768 });
  const handleClick = () => {
    if (isXs) {
      return;
    }
    navigate("/users/" + item.id);
  };

  return (
    <div className={"relative"}>
      <span
        className={
          "absolute w-[20%] h-[98%] flex flex-col  justify-between right-1.5 top-1 "
        }
      >
        <TestDrawer userId={"" + item.id} />
        <button
          className="bt m-2"
          type="button"
          onClick={() => navigate("/auth", { state: { user: item } })}
        >
          Auth
        </button>
      </span>
      <Card
        className={"h-[200px] w-[300px] overflow-auto"}
        onClick={handleClick}
      >
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
