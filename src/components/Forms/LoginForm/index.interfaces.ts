import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";

export type FormField = {
  label: string;
  type: string;
};

export type FormFields = {
  [key in keyof IDummyAuth]: FormField;
};
