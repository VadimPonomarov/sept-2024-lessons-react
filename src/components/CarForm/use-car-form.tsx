import { useState } from "react";
import { ICar } from "@/common/interfaces/cars.interfaces.ts";
import { SubmitHandler } from "react-hook-form";

type IProps = {
  reset: any;
};

export const useCarForm = ({ reset }:IProps) => {
  const [formData, setFormData] = useState<ICar | null>(null);

  const onCreate = (data: ICar) => {
    const newData = { ...data, id: Math.floor(Math.random() * 10000) };
    setFormData(newData);
    reset(newData);
  };

  const onUpdate = (data: ICar) => {
    setFormData(data);
    reset(data);
  };

  const onSubmit: SubmitHandler<ICar> = (data) => {
    if (data.id) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
  };

  const handleReset = () => {
    setFormData(null);
    reset({
      id: undefined,
      brand: "",
      price: "",
      year: "",
    } as unknown as ICar);
  };

  return { formData, onCreate, onUpdate, onSubmit, handleReset };
};
