import { FC } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle.tsx";
import { Outlet } from "react-router-dom";
import { MenuMain } from "@/components/MenuMain/MenuMain.tsx";

type IProps = object;
const RootLayout: FC<IProps> = () => {
  return (
    <div className={"m-2 flex h-screen w-screen flex-col p-2 align-top"}>
      <MenuMain />
      <ThemeToggle />
      <Outlet />
    </div>
  );
};
export default RootLayout;
