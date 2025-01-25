import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { FC } from "react";

import { Button } from "@/components/ui/button.tsx";

interface IProps {
  orientation: "vertical" | "horizontal";
  onEdit?: () => void;
  onDelete?: () => void;
  onCreate?: () => void;
}

export const CrudButtonGroup: FC<IProps> = ({
  orientation,
  onEdit,
  onDelete,
  onCreate,
}) => {
  return (
    <div
      className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} justify-center gap-2 align-middle`}
    >
      {onCreate && (
        <Button variant="ghost" className={"p-0"} onClick={onCreate}>
          <PlusCircleIcon />
        </Button>
      )}
      {onEdit && (
        <Button variant="ghost" className={"p-0"} onClick={onEdit}>
          <PencilSquareIcon />
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" className={"p-0"} onClick={onDelete}>
          <Trash2Icon />
        </Button>
      )}
    </div>
  );
};

export default CrudButtonGroup;
