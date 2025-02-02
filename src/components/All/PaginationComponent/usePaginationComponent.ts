import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IProps } from "./interfaces";

export const usePaginationComponent = ({ total }: IProps) => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (!params.get("skip")) {
      setParams({ skip: "0", limit: params.get("limit") || "30" });
    }
  }, [params, setParams]);

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

  const currentPage =
    Math.floor(Number(params.get("skip")) / Number(params.get("limit"))) + 1 || 1;
  const hasNextPage =
    (total - Number(params.get("skip"))) / Number(params.get("limit")) > 1;
  const hasPrevPage = Number(params.get("skip")) >= Number(params.get("limit"));

  return {
    setNext,
    setPrev,
    currentPage,
    hasNextPage,
    hasPrevPage,
  };
};
