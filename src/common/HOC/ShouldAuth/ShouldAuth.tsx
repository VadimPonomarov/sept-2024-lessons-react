import { useAppSelector } from "@/common/hooks/store/useApp.ts";
import { Navigate } from "react-router-dom";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const ShouldAuth: FC<IProps> = ({ children }) => {
  const { authMe } = useAppSelector(state => state.ini);
  if (!authMe) {
    return <Navigate to="/auth" />;
  }
  return <>{children}</>;
};

export default ShouldAuth;
