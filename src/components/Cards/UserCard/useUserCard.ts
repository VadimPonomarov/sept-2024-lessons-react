import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

export const useUserCard = (item: { id: string | number }) => {
  const navigate = useNavigate();
  const isXs = useMediaQuery({ maxWidth: 768 });
  const dispatch = useAppDispatch();
  const [debouncedNavigate] = useDebounce((uri: string) => navigate(uri), 500);

  const handleClick = () => {
    if (isXs) {
      return;
    }
    navigate("/users/" + item.id.toString);
  };

  const handleClickToAuth = () => {
    dispatch(iniActions.setCurrentUserById(Number(item.id)));
    debouncedNavigate("/auth");
  };

  return {
    handleClick,
    handleClickToAuth,
  };
};
