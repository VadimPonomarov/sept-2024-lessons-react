import { FC } from "react";
import { IUser } from "@/interfaces/users.interfaces.ts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TestDrawer } from "@/components/Drawer/TestDrawer.tsx";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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
      <span className={"absolute right-1 top-1"}>
        <TestDrawer userId={"" + item.id} />
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
