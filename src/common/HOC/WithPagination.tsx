import { FC } from "react";
import { PaginationComponent } from "@/components/All/PaginationComponent/PaginationComponent.tsx";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const WithPagination: FC<IProps> = ({
  children,
  className = "z-50 fixed flex w-full justify-center top-[60px]",
}) => {
  return (
    <>
      <div className={className}>
        <PaginationComponent />
      </div>
      {children}
    </>
  );
};

export default WithPagination;
