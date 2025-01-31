export interface IResponse<T> {
  users: T[];
}

export interface IProps<T> {
  queryKey: string[];
  filterKeys: (keyof T)[];
}
