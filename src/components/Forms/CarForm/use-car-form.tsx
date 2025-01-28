import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DefaultValues, KeepStateOptions, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import useApiCars from "@/api/use-api-cars.tsx";
import { ICar, ICarCreate } from "@/common/interfaces/cars.interfaces.ts";

type IProps = {
  reset: (
    values?: DefaultValues<ICar> | ICar,
    keepStateOptions?: KeepStateOptions,
  ) => void;
};

export const useCarForm = ({ reset }: IProps) => {
  const [formData, setFormData] = useState<ICar | null>(null);
  const { car } = useLocation().state as { car: ICar };
  const client = useQueryClient();
  const navigate = useNavigate();
  const { apiCarsService } = useApiCars();

  const { mutate: create } = useMutation({
    mutationFn: (data: ICarCreate) => apiCarsService.create(data),
    onSuccess: newCar => {
      client.setQueryData(["cars"], (oldCars: ICar[]) => {
        return [...(oldCars as ICar[]), newCar];
      });
    },
  });
  const { mutate: update } = useMutation({
    mutationFn: (data: ICar) => apiCarsService.updateById(data.id.toString(), data),
    onSuccess: newCar => {
      client.setQueryData(["cars"], (oldCars: ICar[]) => {
        const oldCarsFiltered = (oldCars as ICar[]).filter(
          item => item.id !== newCar?.id,
        );
        return [...(oldCarsFiltered as ICar[]), newCar];
      });
    },
  });
  const { mutate: del } = useMutation({
    mutationFn: (id: string) => apiCarsService.deleteById(id),
    onSuccess: () => {
      client.setQueryData(["cars"], (oldCars: ICar[]) => {
        const oldCarsFiltered = (oldCars as ICar[]).filter(item => item.id !== car.id);
        return [...(oldCarsFiltered as ICar[])];
      });
    },
  });

  const onCreate = (data: ICar) => {
    const newData = { ...data, id: Math.floor(Math.random() * 10000) };
    setFormData(newData);
    create(newData);
    reset(newData);
    navigate(-1);
  };

  const onUpdate = (data: ICar) => {
    setFormData(data);
    update(data);
    reset(data);
    navigate(-1);
  };

  const onDelete = () => {
    if (car.id) {
      del(car.id.toString());
      navigate(-1);
    }
  };

  const onSubmit: SubmitHandler<ICar> = data => {
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

  return {
    formData,
    setFormData,
    onCreate,
    onUpdate,
    onDelete,
    onSubmit,
    handleReset,
  };
};
