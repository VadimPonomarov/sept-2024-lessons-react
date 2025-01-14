import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TestDrawerCard } from "@/components/DrawerCard/TestDrawerCard.tsx";

type IProps = object;

export const UsersCartPage: FC<IProps> = () => {
  const { userId } = useParams();
  useEffect(() => {}, [userId]);
  return <TestDrawerCard key={userId} userId={"" + userId!} />;
};
