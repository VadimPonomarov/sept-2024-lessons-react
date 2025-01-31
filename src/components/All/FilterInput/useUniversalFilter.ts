import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IProps, IResponse } from "./index.interfaces";

const useUniversalFilter = <T>({ queryKey, filterKeys }: IProps<T>) => {
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

  return {
    inputValues,
    handleInputChange,
    handleFocus,
    handleReset,
  };
};

export default useUniversalFilter;
