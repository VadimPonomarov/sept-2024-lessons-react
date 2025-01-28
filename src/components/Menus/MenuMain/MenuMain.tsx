import { useAppSelector } from "@/common/hooks/store/hooks.ts";
import Menu from "@/components/All/MenuTemplate/Menu.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export const MenuMain = () => {
  const { authMe } = useAppSelector(state => state.ini);
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/users", label: "Users" },
    { path: "/posts", label: "Posts", requiresAuth: true, disabled: !authMe },
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
