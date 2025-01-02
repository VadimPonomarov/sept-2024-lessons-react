// @flow
import { FC } from "react";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import { SimpsonsMain } from "@/components/SimpsonsMain.tsx";

type IProps = object;
const RootLayout: FC<IProps> = () => {
  return (
    <div
      className={
        "h-[98vh] w-full flex-auto flex-row justify-evenly gap-2 overflow-y-scroll p-4"
      }
    >
      <ThemeToggle />
      <SimpsonsMain />
    </div>
  );
};
export default RootLayout;
