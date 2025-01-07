import {useEffect} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "../ui/select.tsx";
import {useSearchParams} from "react-router-dom";

const SearchParamLimitSelector = () => {
    const [params, setParams] = useSearchParams();
    useEffect(() => {
    }, [params]);
    return (
        <Select
            value={params.get("limit") || "30"}
            onValueChange={(value) => setParams({limit: value})}
        >
            <SelectTrigger className="w-[70px] border-none text-xs focus:border-none">
                <SelectValue placeholder="Limit"/>
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
