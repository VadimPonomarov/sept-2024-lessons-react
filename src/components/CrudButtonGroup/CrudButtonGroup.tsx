import { FC } from "react";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

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
      className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} justify-center gap-2`}
    >
      {onCreate && (
        <Button
          variant="outline"
          onClick={onCreate}
          className="border-none bg-transparent p-0 shadow-none"
        >
          <PlusCircleIcon className="h-6 w-6" />
        </Button>
      )}
      {onEdit && (
        <Button
          variant="outline"
          onClick={onEdit}
          className="border-none bg-transparent p-0 shadow-none"
        >
          <PencilSquareIcon className="h-6 w-6" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="outline"
          onClick={onDelete}
          className="border-none bg-transparent p-0 shadow-none"
        >
          <Trash2Icon className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default CrudButtonGroup;
