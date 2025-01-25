import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link } from "react-router-dom";

import useApiCars from "@/api/use-api-cars.tsx";
import { CarCard } from "@/components/Cards/CarCard/CarCard.tsx";
import { Button } from "@/components/ui/button.tsx";

export const CarsPage: FC = () => {
  const { apiCarsService } = useApiCars();
  const { data, isFetching } = useQuery({
    queryKey: ["cars"],
    queryFn: apiCarsService.cars,
    staleTime: 10000,
  });

  return (
    <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      <Link to={"/cars/create"} state={{ car: {} }}>
        <Button variant={"outline"}>+</Button>
      </Link>
      {isFetching && <div>Fetching ...</div>}
      <div
        className={
          "absolute top-[60px] flex w-full flex-wrap justify-evenly gap-2"
        }
      >
        {data &&
          data
            .sort((a, b) => a.id - b.id)
            .map((item) => <CarCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};
