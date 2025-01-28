import { joiResolver } from "@hookform/resolvers/joi";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { ICar } from "@/common/interfaces/cars.interfaces.ts";
import { ResizableWrapper } from "@/components/All/ResizableWrapper/ResizableWrapper.tsx";
import { useCarForm } from "@/components/Forms/CarForm/use-car-form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

import css from "./form.module.css";
import { schema } from "./schemas.joi.ts";

const CarForm: FC = () => {
  const { car } = useLocation().state as { car: ICar };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ICar>({
    resolver: joiResolver(schema),
    defaultValues: car,
    mode: "all",
  });

  const { onDelete, onSubmit, handleReset } = useCarForm({ reset });

  return (
    <div className={css.container}>
      <ResizableWrapper>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          {car?.id && (
            <div className={css.formGroup}>
              <label htmlFor="id">ID</label>
              <Input {...register("id")} id="id" type="number" disabled />
              {errors.id && <p className={css.error}>{errors.id.message}</p>}
            </div>
          )}
          <div className={css.formGroup}>
            <label htmlFor="brand">Brand</label>
            <Input {...register("brand")} id="brand" />
            {errors.brand && <p className={css.error}>{errors.brand.message}</p>}
          </div>
          <div className={css.formGroup}>
            <label htmlFor="price">Price</label>
            <Input {...register("price")} id="price" type="number" />
            {errors.price && <p className={css.error}>{errors.price.message}</p>}
          </div>
          <div className={css.formGroup}>
            <label htmlFor="year">Year</label>
            <Input {...register("year")} id="year" type="number" />
            {errors.year && <p className={css.error}>{errors.year.message}</p>}
          </div>
          <div className={css.buttonGroup}>
            <Button type="submit" disabled={!isValid}>
              {car?.id ? "Edit" : "Create"}
            </Button>
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
            <Button type="button" disabled={!car?.id} onClick={onDelete}>
              Delete
            </Button>
          </div>
        </form>
      </ResizableWrapper>
    </div>
  );
};

export default CarForm;
