export interface IResponse<T> {
  users: T[];
}

export interface IProps<T> {
  queryKey: string[];
  targetArrayKey: string | keyof T;
  filterKeys: (keyof T)[];
  cb?: (...args: any[]) => void;
}
