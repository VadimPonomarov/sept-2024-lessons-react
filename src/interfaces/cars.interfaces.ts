export interface ICar {
  id: number;
  brand: string;
  price: number;
  year: number;
}

export interface ICarCreate extends Omit<ICar, "id"> {}

export interface ICarUpdate extends Partial<ICarCreate> {}

export type ICarsResponse = ICar[];
