import axios from "axios";
import { baseCarsUrl } from "@/common/constants/constants.ts";
import {
  ICar,
  ICarCreate,
  ICarsResponse,
} from "@/common/interfaces/cars.interfaces.ts";

const apiCars = axios.create({
  baseURL: baseCarsUrl,
  timeout: 1000,
  headers: {
    accept: "application/json",
  },
});

export const apiCarsService = {
  cars: async (): Promise<ICarsResponse | undefined> => {
    try {
      const response = await apiCars.get("/cars");
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  carsCreate: async (data: ICarCreate): Promise<ICar | undefined> => {
    try {
      const response = await apiCars.post("/cars", data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  carUpdateById: async (
    id: string,
    data: ICarCreate,
  ): Promise<ICar | undefined> => {
    try {
      const response = await apiCars.put("/cars" + "/" + id, data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
};
