import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input.tsx";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    const handleParamsChange = () => {
      const skip = params.get("skip") || "0";
      setInputValue(skip);
    };

    handleParamsChange();
    window.addEventListener("popstate", handleParamsChange);

    return () => {
      window.removeEventListener("popstate", handleParamsChange);
    };
  }, [params]);

  useEffect(() => {
    const skip = params.get("skip") || "0";
    setInputValue(skip);
  }, [params]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="flex items-center gap-2">
      <span onClick={handleReset} className="text-xs">
        💥
      </span>
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
