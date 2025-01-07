// @flow
import { FC } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle.tsx";
import { TodosComponent } from "@/components/TodosComponent/TodosComponent.tsx";

type IProps = object;
const RootLayout: FC<IProps> = () => {
  return (
    <div className={"mt-[30px] flex p-2"}>
      <ThemeToggle />
      <TodosComponent />
    </div>
  );
};
export default RootLayout;
