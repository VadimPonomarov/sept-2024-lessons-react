import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select.tsx";

const SearchParamLimitSelector = () => {
  const [params, setParams] = useSearchParams();

  const handleLimitChange = (value: string) => {
    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("limit", value);
      return newParams;
    });
  };

  return (
    <Select
      value={params.get("limit") || "30"}
      onValueChange={handleLimitChange}
    >
      <SelectTrigger className="w-[70px] border-none text-xs focus:border-none">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="30">30</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SearchParamLimitSelector;
