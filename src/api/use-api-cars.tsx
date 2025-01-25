import { getAxiosService } from "@/api/get-axios-service.ts";
import { baseCarsUrl } from "@/common/constants/constants.ts";
import {
  ICar,
  ICarCreate,
  ICarsResponse,
} from "@/common/interfaces/cars.interfaces.ts";

const useApiCars = () => {
  const apiCars = getAxiosService(baseCarsUrl);
  const apiCarsService = {
    cars: async (): Promise<ICarsResponse> => {
      try {
        const response = await apiCars.get("/cars");
        return response.data;
      } catch (e) {
        console.log(e);
      }
    },
    create: async (data: ICarCreate): Promise<ICar> => {
      try {
        const response = await apiCars.post("/cars", data);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    },
    updateById: async (id: string, data: ICarCreate): Promise<ICar> => {
      try {
        const response = await apiCars.put("/cars" + "/" + id, data);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    },
    deleteById: async (id: string): Promise<void> => {
      try {
        await apiCars.delete("/cars" + "/" + id);
        return;
      } catch (e) {
        console.log(e);
      }
    },
  };
  return { apiCarsService };
};

export default useApiCars;
