// @flow
import { FC } from "react";
import ThemeToggle from "@/components/ThemeToggle.tsx";

type IProps = object;
const RootLayout: FC<IProps> = () => {
  return (
    <div className={"mt-[30px] flex p-2"}>
      <ThemeToggle />
    </div>
  );
};
export default RootLayout;
