import { FC, ReactNode, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

interface IDataItem {
  id: number;
  name: string;
  status: string;
  // Добавьте другие поля по необходимости
  data: ISubItem[];
}

interface ISubItem {
  subId: number;
  subName: string;
  subStatus: string;
  // Добавьте другие поля по необходимости
}

interface UniversalFilterProps {
  queryKey: string[];
  filterKeys: (keyof ISubItem)[];
}

const UniversalFilter: FC<UniversalFilterProps> = ({ queryKey, filterKeys }) => {
  const [inputValues, setInputValues] = useState<{ [key in keyof ISubItem]?: string }>(
    {},
  );
  const [filteredData, setFilteredData] = useState<IDataItem[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const data = queryClient.getQueryData<IDataItem[]>(queryKey);
      console.log("Fetched data from cache:", data); // Отладочное сообщение
      if (data) {
        const filtered = data.map(item => ({
          ...item,
          data: item.data.filter(subItem =>
            filterKeys.every(key =>
              String(subItem[key])
                .toLowerCase()
                .includes(inputValues[key]?.toLowerCase() || ""),
            ),
          ),
        }));
        console.log("Filtered data:", filtered); // Отладочное сообщение
        setFilteredData(filtered);
      }
    }, 300); // Задержка перед фильтрацией

    return () => clearTimeout(timeoutId);
  }, [inputValues, queryClient, queryKey, filterKeys]);

  const handleInputChange = (key: keyof ISubItem, value: string) => {
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
      <div>
        {filteredData.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            {item.data.map(subItem => (
              <div key={subItem.subId}>
                {filterKeys.map(key => (
                  <span key={String(key)}>{renderValue(subItem[key])} </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversalFilter;
