import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IProps, IResponse } from "./index.interfaces";
import { useAppDispatch } from "@/common/hooks/store/useApp.ts";
import { IUser } from "@/common/interfaces/users.interfaces.ts";

const useUniversalFilter = <T>({
  queryKey,
  filterKeys,
  targetArrayKey,
  cb,
}: IProps<T>) => {
  const [inputValues, setInputValues] = useState<{ [key in keyof T]?: string }>({});
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = queryClient.getQueryData<IResponse<T>>(queryKey);

    if (data && Array.isArray(data[targetArrayKey as keyof IResponse<T>])) {
      const filtered = (data[targetArrayKey as keyof IResponse<T>] as T[]).filter(
        user =>
          filterKeys.every(key =>
            new RegExp(inputValues[key] || "", "i").test(String(user[key as keyof T])),
          ),
      );
      cb(filtered as IUser[]);
    }
  }, [inputValues, queryClient, dispatch]);

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
