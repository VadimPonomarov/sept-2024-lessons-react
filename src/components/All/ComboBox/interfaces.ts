interface IItem {
  value: string;
  label: string;
}

export interface IProps {
  items?: IItem[];
  onSelect?: (id: number) => void;
  label?: string;
}

export type IComboBoxItem = IItem;
