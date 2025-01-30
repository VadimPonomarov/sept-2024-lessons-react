import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import SearchParamLimitSelector from "@/components/All/SearchParamLimitSelector/SearchParamLimitSelector.tsx";
import SearchParamSkipSelector from "@/components/All/SearchParamSkipSelector/SearchParamSkipSelector.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";

interface IProps {
  total: number;
}

export const PaginationComponent: FC<IProps> = ({ total }) => {
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
        <PaginationContent>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SearchParamSkipSelector />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-blue-100 text-blue-900 pl-5 pr-5 border rounded-[5px]"
              >
                <p>Skip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {Number(params.get("skip")) >= Number(params.get("limit")) && (
            <PaginationItem onClick={setPrev} style={{ cursor: "pointer" }}>
              <PaginationPrevious />
            </PaginationItem>
          )}
          <PaginationItem style={{ cursor: "pointer" }}>
            <PaginationLink>
              {Math.floor(Number(params.get("skip")) / Number(params.get("limit"))) +
                1 || 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem style={{ cursor: "pointer" }}>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem onClick={setNext} style={{ cursor: "pointer" }}>
            {(total - Number(params.get("skip"))) / Number(params.get("limit")) > 1 && (
              <PaginationNext />
            )}
          </PaginationItem>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SearchParamLimitSelector />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-blue-100 text-blue-900 pl-5 pr-5 border rounded-[5px]"
              >
                <p>Limit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PaginationContent>
      </Pagination>
    </>
  );
};
