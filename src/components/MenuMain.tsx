import { FC } from "react";
import { Menubar, MenubarMenu } from "@/components/ui/menubar.tsx";
import { MenubarTrigger } from "@radix-ui/react-menubar";
import { NavLink } from "react-router-dom";

type IProps = object;

export const MenuMain: FC<IProps> = () => {
  return (
    <Menubar className="mb-2 flex w-full justify-center gap-4 border-2 bg-primary p-2 text-primary-foreground">
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
    </Menubar>
  );
};
