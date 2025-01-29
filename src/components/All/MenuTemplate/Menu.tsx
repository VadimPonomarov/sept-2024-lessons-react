import {MenubarTrigger} from "@radix-ui/react-menubar";
import {FC} from "react";
import {NavLink} from "react-router-dom";

import {useAppSelector} from "@/common/hooks/store/hooks.ts";
import {IMenuItem, IProps} from "@/components/All/MenuTemplate/menu.interfaces.ts";
import {Menubar, MenubarMenu} from "@/components/ui/menubar.tsx";

import {clsx} from "clsx";
import {Button} from "@/components/ui/button.tsx";

const Menu: FC<IProps> = ({children, items, className}) => {
    const {authMe} = useAppSelector(state => state.ini);

    const isDisabled = (item: IMenuItem) => {
        if (!authMe && item.requiresAuth) {
            return item.disabled ?? true;
        }
        return false;
    };

    return (
        <Menubar className={clsx("menu", className)}>
            {items.map(item => (
                <Button className={"border-b-2"}>
                    <MenubarMenu key={item.path}>

                        <NavLink
                            to={item.path}
                            className={({isActive}) =>
                                clsx(isActive && "active", isDisabled(item) && "disabled")
                            }
                            onClick={e => isDisabled(item) && e.preventDefault()}
                        >

                            <MenubarTrigger disabled={isDisabled(item)}>{item.label}</MenubarTrigger>

                        </NavLink>

                    </MenubarMenu>
                </Button>
            ))}
            {children}
        </Menubar>
    );
};

export default Menu;

