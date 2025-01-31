import { FC, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { IUser } from "@/common/interfaces/users.interfaces.ts";

interface IResponse<T> {
  users: T[];
}

interface UniversalFilterProps<T> {
  queryKey: string[];
  filterKeys: (keyof T)[];
}

const UniversalFilter: FC<UniversalFilterProps<IUser>> = ({ queryKey, filterKeys }) => {
  const [inputValues, setInputValues] = useState<{ [key in keyof IUser]?: string }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    // Получаем массив данных
    const data = queryClient.getQueryData<IResponse<IUser>>(queryKey);
    console.log("Fetched data from cache:", data); // Отладочное сообщение

    // Применяем фильтрацию по полю username
    if (data && Array.isArray(data.users)) {
      const filtered = data.users.filter(user =>
        filterKeys.every(key =>
          new RegExp(inputValues[key] || "", "i").test(
            String(user[key as keyof IUser]),
          ),
        ),
      );
      console.log("Filtered data:", filtered); // Отладочное сообщение
    }
  }, [inputValues, queryClient, queryKey, filterKeys]);

  const handleInputChange = (key: keyof IUser, value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
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
            placeholder={`Введите значение для фильтрации по ${String(key)}`}
          />
        </div>
      ))}
    </div>
  );
};

export default UniversalFilter;
