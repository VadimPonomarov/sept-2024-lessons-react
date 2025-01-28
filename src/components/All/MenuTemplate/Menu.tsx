import { MenubarTrigger } from "@radix-ui/react-menubar";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "@/common/hooks/store/hooks.ts";
import { IMenuItem, IProps } from "@/components/All/MenuTemplate/menu.interfaces.ts";
import { Menubar, MenubarMenu } from "@/components/ui/menubar.tsx";

import styles from "./Menu.module.css";

const Menu: FC<IProps> = ({ children, items, className }) => {
  const { authMe } = useAppSelector(state => state.ini);

  const isDisabled = (item: IMenuItem) => {
    if (typeof item.disabled === "boolean") {
      return item.disabled;
    }
    return item.requiresAuth && !authMe;
  };

  return (
    <Menubar className={[styles.menu, className].join(" ")}>
      {items.map(item => (
        <MenubarMenu key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              (isActive ? "active" : "") + (isDisabled(item) ? " disabled" : "")
            }
            onClick={e => isDisabled(item) && e.preventDefault()}
          >
            <MenubarTrigger disabled={isDisabled(item)}>{item.label}</MenubarTrigger>
          </NavLink>
        </MenubarMenu>
      ))}
      {children}
    </Menubar>
  );
};

export default Menu;
