import { FC, memo, useState } from "react";
import { apiCarsService } from "@/api/apiCars.ts";
import { ICarsResponse } from "@/common/interfaces/cars.interfaces.ts";
import useFetch from "@/common/hooks/use-fetch/useFetch.tsx";
import { CarCard } from "@/components/CarCard/CarCard.tsx";

type IProps = object;

export const CarsPage: FC<IProps> = memo(() => {
  const [cars, setCars] = useState<ICarsResponse | undefined>(undefined);

  useFetch({ set: setCars, cb: apiCarsService.cars });

  return (
    <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      <div
        className={
          "absolute top-[60px] flex w-full flex-wrap justify-evenly gap-2"
        }
      >
        {cars && cars.map((item) => <CarCard key={item.id} item={item} />)}
      </div>
    </div>
  );
});
