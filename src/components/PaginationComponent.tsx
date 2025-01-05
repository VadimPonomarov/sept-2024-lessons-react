import { FC, memo, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { useSearchParams } from "react-router-dom";

interface IProps {
  total: number;
}

export const PaginationComponent: FC<IProps> = memo(({ total }) => {
  const [params, setParams] = useSearchParams();

  const setNext = () => {
    const newSkip = (
      Number(params.get("skip") || "0") + Number(params.get("limit") || "30")
    ).toString();
    setParams({ skip: newSkip, limit: params.get("limit") || "30" });
  };

  const setPrev = () => {
    const newSkip = (
      Number(params.get("skip") || "0") - Number(params.get("limit") || "30")
    ).toString();
    setParams({ skip: newSkip, limit: params.get("limit") || "30" });
  };

  useEffect(() => {
    if (!params.get("skip") || !params.get("limit")) {
      setParams({ skip: "0", limit: "30" });
    }
  }, [params, setParams]);

  return (
    <>
      <Pagination>
        <PaginationContent>
          {Number(params.get("skip")) >= Number(params.get("limit")) && (
            <PaginationItem onClick={setPrev}>
              <PaginationPrevious href="" />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="">
              {Math.ceil(
                Number(params.get("skip")) / Number(params.get("limit")),
              ) || 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem onClick={setNext}>
            {(total - Number(params.get("skip"))) /
              Number(params.get("limit")) >
              1 && <PaginationNext href="" />}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
});
