import { MenubarTrigger } from "@radix-ui/react-menubar";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "@/common/hooks/store/hooks.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { Menubar, MenubarMenu } from "@/components/ui/menubar.tsx";

type IProps = object;

export const MenuMain: FC<IProps> = () => {
  const { authMe } = useAppSelector(state => state.ini);
  return (
    <Menubar className="fixed z-40 mb-2 flex w-full justify-center gap-4 border-2 bg-primary p-2 text-primary-foreground">
      <MenubarMenu>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          <MenubarTrigger>Home</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      <MenubarMenu>
        <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
          <MenubarTrigger>Users</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      <MenubarMenu>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            (isActive ? "active" : "") + (!authMe ? " disabled" : "")
          }
          onClick={e => !authMe && e.preventDefault()}
        >
          <MenubarTrigger disabled={!authMe}>Posts</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      <MenubarMenu>
        <NavLink to="/cars" className={({ isActive }) => (isActive ? "active" : "")}>
          <MenubarTrigger>Cars</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      <MenubarMenu>
        <NavLink to="/auth" className={({ isActive }) => (isActive ? "active" : "")}>
          <MenubarTrigger>Auth</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      {authMe && (
        <Badge variant="destructive" className={"absolute right-20"}>
          {authMe.firstName}
        </Badge>
      )}
    </Menubar>
  );
};
