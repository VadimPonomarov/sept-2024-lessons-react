import {FC, memo} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import {useSearchParams} from "react-router-dom";
import SearchParamLimitSelector from "@/components/SearchParamLimitSelector/SearchParamLimitSelector.tsx";

interface IProps {
    total: number;
}

export const PaginationComponent: FC<IProps> = memo(({total}) => {
    const [params, setParams] = useSearchParams();

    const setNext = () => {
        const newSkip = (
            Number(params.get("skip") || "0") + Number(params.get("limit") || "30")
        ).toString();
        setParams({skip: newSkip, limit: params.get("limit") || "30"});
    };

    const setPrev = () => {
        const newSkip = (
            Number(params.get("skip") || "0") - Number(params.get("limit") || "30")
        ).toString();
        setParams({skip: newSkip, limit: params.get("limit") || "30"});
    };

    return (
        <>
            <Pagination>
                <SearchParamLimitSelector/>
                <PaginationContent>
                    {Number(params.get("skip")) >= Number(params.get("limit")) && (
                        <PaginationItem onClick={setPrev}>
                            <PaginationPrevious href=""/>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink href="">
                            {Math.floor(
                                Number(params.get("skip")) / Number(params.get("limit")),
                            ) + 1 || 1}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem onClick={setNext}>
                        {(total - Number(params.get("skip"))) /
                            Number(params.get("limit")) >
                            1 && <PaginationNext href=""/>}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
});
