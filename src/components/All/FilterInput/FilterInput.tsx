import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IProps, IResponse } from "./index.interfaces";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UniversalFilter = <T,>({ queryKey, filterKeys }: IProps<T>) => {
  const [inputValues, setInputValues] = useState<{ [key in keyof T]?: string }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    // Получаем массив данных
    const data = queryClient.getQueryData<IResponse<T>>(queryKey);
    console.log("Fetched data from cache:", data); // Отладочное сообщение

    // Применяем фильтрацию по полю username
    if (data && Array.isArray(data.users)) {
      const filtered = data.users.filter(user =>
        filterKeys.every(key =>
          new RegExp(inputValues[key] || "", "i").test(String(user[key as keyof T])),
        ),
      );
      console.log("Filtered data:", filtered); // Отладочное сообщение
    }
  }, [inputValues, queryClient, queryKey, filterKeys]);

  const handleInputChange = (key: keyof T, value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleReset = () => {
    setInputValues({});
  };

  return (
    <div>
      {filterKeys.map(key => (
        <div
          key={String(key)}
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <label
            htmlFor={String(key)}
            style={{ marginRight: "8px", textTransform: "capitalize" }}
          >
            {String(key)}
          </label>
          <Input
            id={String(key)}
            value={inputValues[key] || ""}
            onChange={e => handleInputChange(key, e.target.value)}
            onFocus={handleFocus}
            placeholder={`...`}
          />
        </div>
      ))}
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
};

export default UniversalFilter;
