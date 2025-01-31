import { FC, ReactNode, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

interface IDataItem {
  id: number;
  name: string;
  status: string;
  // Добавьте другие поля по необходимости
}

interface UniversalFilterProps {
  queryKey: string[];
  filterKeys: (keyof IDataItem)[];
}

const UniversalFilter: FC<UniversalFilterProps> = ({ queryKey, filterKeys }) => {
  const [inputValues, setInputValues] = useState<{ [key in keyof IDataItem]?: string }>(
    {},
  );
  const [filteredData, setFilteredData] = useState<IDataItem[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const data = queryClient.getQueryData<IDataItem[]>(queryKey);
      console.log("Fetched data from cache:", data); // Отладочное сообщение
      if (data) {
        const filtered = data.filter(item =>
          filterKeys.every(key =>
            String(item[key])
              .toLowerCase()
              .includes(inputValues[key]?.toLowerCase() || ""),
          ),
        );
        console.log("Filtered data:", filtered); // Отладочное сообщение
        setFilteredData(filtered);
      }
    }, 300); // Задержка перед фильтрацией

    return () => clearTimeout(timeoutId);
  }, [inputValues, queryClient, queryKey, filterKeys]);

  const handleInputChange = (key: keyof IDataItem, value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  const renderValue = (value: any): ReactNode => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return null;
  };

  return (
    <div>
      {filterKeys.map(key => (
        <Input
          key={String(key)}
          value={inputValues[key] || ""}
          onChange={e => handleInputChange(key, e.target.value)}
          placeholder={`${String(key)}`}
        />
      ))}
      <div>
        {filteredData.map(item => (
          <div key={item.id}>
            {filterKeys.map(key => (
              <span key={String(key)}>{renderValue(item[key])} </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversalFilter;
