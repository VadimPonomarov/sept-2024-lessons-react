import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { FC } from "react";

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

import styles from "./index.module.css";
import { usePaginationComponent } from "./usePaginationComponent";
import { IProps } from "./interfaces";

export const PaginationComponent: FC<IProps> = ({ total }) => {
  const { setNext, setPrev, currentPage, hasNextPage, hasPrevPage } =
    usePaginationComponent({ total });

  return (
    <>
      <Pagination>
        <PaginationContent>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SearchParamSkipSelector />
              </TooltipTrigger>
              <TooltipContent side="bottom" className={styles.tooltipContent}>
                <p>Skip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {hasPrevPage && (
            <PaginationItem onClick={setPrev} style={{ cursor: "pointer" }}>
              <PaginationPrevious />
            </PaginationItem>
          )}
          <PaginationItem style={{ cursor: "pointer" }}>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem style={{ cursor: "pointer" }}>
            <PaginationEllipsis />
          </PaginationItem>
          {hasNextPage && (
            <PaginationItem onClick={setNext} style={{ cursor: "pointer" }}>
              <PaginationNext />
            </PaginationItem>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SearchParamLimitSelector />
              </TooltipTrigger>
              <TooltipContent side="bottom" className={styles.tooltipContent}>
                <p>Limit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PaginationContent>
      </Pagination>
    </>
  );
};
