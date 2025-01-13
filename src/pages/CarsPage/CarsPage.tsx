import { FC, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CarCard } from "@/components/CarCard/CarCard.tsx";
import { apiCarsService } from "@/api/apiCars.ts";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export const CarsPage: FC = memo(() => {
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["cars"],
    queryFn: apiCarsService.cars,
    staleTime: 10000,
  });

  const navigate = useNavigate();
  return (
    <div className={"relative mt-[40px] flex flex-wrap justify-evenly gap-2"}>
      <Button
        variant={"outline"}
        onClick={() => navigate("/cars/create", { state: { car: {} } })}
      >
        +
      </Button>
      {isFetching && <div>Fetching ...</div>}
      <div
        className={
          "absolute top-[60px] flex w-full flex-wrap justify-evenly gap-2"
        }
      >
        {isSuccess &&
          data &&
          data.sort((a, b) => a.id - b.id).map((item) => <CarCard key={item.id} item={item} />)}
      </div>
    </div>
  );
});
