import {useSearchParams} from "react-router-dom";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {XIcon} from "lucide-react";

const SearchParamSkipSelector = () => {
    const [params, setParams] = useSearchParams();

    const handleSkipChange = (value: string) => {
        setParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("skip", value);
            return newParams;
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSkipChange(event.target.value);
    };

    const handleReset = () => {
        setParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("skip", "0");
            return newParams;
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Button variant={"ghost"} onClick={handleReset} className="text-xs">
                <XIcon className="w-3 p-0"/>
            </Button>
            <Input
                type="number"
                value={params.get("skip") || "0"}
                onChange={handleInputChange}
                className="w-[70px] border-none text-xs focus:border-none"
                placeholder="Skip"
            />
        </div>
    );
};

export default SearchParamSkipSelector;


