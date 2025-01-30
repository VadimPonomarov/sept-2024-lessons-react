import { useAppSelector } from "@/common/hooks/store/useApp.ts";
import Menu from "@/components/All/MenuTemplate/Menu.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export const MenuMain = () => {
  const { authMe } = useAppSelector(state => state.ini);
  const menuItems = [
    { path: "/", label: "Home", disabled: !!authMe },
    { path: "/users", label: "Users", requiresAuth: true, disabled: !authMe },
    { path: "/recipes", label: "Recipes", requiresAuth: true, disabled: !authMe },
    { path: "/auth", label: "Auth" },
  ];

  return (
    <Menu items={menuItems}>
      {authMe && (
        <Badge variant="destructive" className={"absolute right-20"}>
          {authMe.firstName}
        </Badge>
      )}
    </Menu>
  );
};
