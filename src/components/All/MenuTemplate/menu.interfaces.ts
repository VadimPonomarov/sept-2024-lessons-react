export interface IMenuItem {
  path: string;
  label: string;
  requiresAuth?: boolean;
  disabled?: boolean;
}

export interface IProps {
  children?: React.ReactNode;
  items: IMenuItem[];
  className?: string;
}
