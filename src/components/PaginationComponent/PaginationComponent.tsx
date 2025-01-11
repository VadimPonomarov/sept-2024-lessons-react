import { FC, memo } from "react";
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
import SearchParamLimitSelector from "@/components/SearchParamLimitSelector/SearchParamLimitSelector.tsx";

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

  return (
    <>
      <Pagination>
        <SearchParamLimitSelector />
        <PaginationContent>
          {Number(params.get("skip")) >= Number(params.get("limit")) && (
            <PaginationItem onClick={setPrev} style={{ cursor: 'pointer' }}>
              <PaginationPrevious />
            </PaginationItem>
          )}
          <PaginationItem style={{ cursor: 'pointer' }}>
            <PaginationLink>
              {Math.floor(
                Number(params.get("skip")) / Number(params.get("limit"))
              ) + 1 || 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem style={{ cursor: 'pointer' }}>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem onClick={setNext} style={{ cursor: 'pointer' }}>
            {(total - Number(params.get("skip"))) /
              Number(params.get("limit")) >
              1 && <PaginationNext />}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
});


