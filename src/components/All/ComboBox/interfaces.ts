interface IItem {
  value: string;
  label: string;
}

export interface IProps {
  items?: IItem[];
  onSelect?: (item: IItem) => void;
  label?: string;
}

export type IComboBoxItem = IItem;
