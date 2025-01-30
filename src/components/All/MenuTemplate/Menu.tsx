import { MenubarTrigger } from "@radix-ui/react-menubar";
import { clsx } from "clsx";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/common/hooks/store/useApp.ts";
import { IMenuItem, IProps } from "@/components/All/MenuTemplate/menu.interfaces.ts";
import { Menubar, MenubarMenu } from "@/components/ui/menubar.tsx";

const Menu: FC<IProps> = ({ children, items, className }) => {
  const { authMe } = useAppSelector(state => state.ini);

  const isDisabled = (item: IMenuItem) => {
    if (item.requiresAuth && !authMe) {
      return true;
    }
    return item.disabled ?? false;
  };

  return (
    <Menubar className={clsx("menu", className)}>
      {items.map(item => (
        <span key={item.path} className={"border-b-2"}>
          <MenubarMenu key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(isActive && "active", isDisabled(item) && "disabled")
              }
              onClick={e => isDisabled(item) && e.preventDefault()}
            >
              <MenubarTrigger disabled={isDisabled(item)}>{item.label}</MenubarTrigger>
            </NavLink>
          </MenubarMenu>
        </span>
      ))}
      {children}
    </Menubar>
  );
};

export default Menu;
