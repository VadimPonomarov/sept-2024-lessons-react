import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const SearchParamSkipSelector = () => {
    const [params, setParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(params.get("skip") || "0");
    const [debouncedValue] = useDebounce(inputValue, 500);

    const handleSkipChange = (value: string) => {
        setParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("skip", value);
            return newParams;
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleReset = () => {
        setInputValue("0");
        setParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("skip", "0");
            return newParams;
        });
    };

    useEffect(() => {
        handleSkipChange(debouncedValue);
    }, [debouncedValue]);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    return (
        <div className="flex items-center gap-2">
            <Button variant={"ghost"} size={"icon"} onClick={handleReset} className="text-xs">
                💥
            </Button>
            <Input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className="w-[70px] border-none text-xs focus:border-none"
                placeholder="Skip"
            />
        </div>
    );
};

export default SearchParamSkipSelector;



