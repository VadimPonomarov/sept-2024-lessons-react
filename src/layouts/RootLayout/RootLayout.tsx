import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

import ThemeToggle from "@/components/All/ThemeToggle/ThemeToggle.tsx";
import { MenuMain } from "@/components/Menus/MenuMain/MenuMain.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/store/useApp.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

type IProps = object;
const RootLayout: FC<IProps> = () => {
  const { accessToken } = useAppSelector(state => state.ini);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) {
      dispatch(iniActions.unsetMe());
    }
  }, [accessToken]);

  return (
    <div className={"m-2 flex h-screen w-screen flex-col p-2 align-top"}>
      <MenuMain />
      <ThemeToggle />
      <Outlet />
    </div>
  );
};
export default RootLayout;
