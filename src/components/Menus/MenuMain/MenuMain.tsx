import { MenubarTrigger } from "@radix-ui/react-menubar";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import { Menubar, MenubarMenu } from "@/components/ui/menubar.tsx";

type IProps = object;

export const MenuMain: FC<IProps> = () => {
  return (
    <Menubar className="fixed z-40 mb-2 flex w-full justify-center gap-4 border-2 bg-primary p-2 text-primary-foreground">
      <MenubarMenu>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MenubarTrigger>Home</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      <MenubarMenu>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MenubarTrigger>Users</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      <MenubarMenu>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MenubarTrigger>Posts</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
      <MenubarMenu>
        <NavLink
          to="/cars"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MenubarTrigger>Cars</MenubarTrigger>
        </NavLink>
      </MenubarMenu>
    </Menubar>
  );
};
