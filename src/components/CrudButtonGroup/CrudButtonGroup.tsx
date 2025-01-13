import { FC } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

interface IProps {
  orientation: "vertical" | "horizontal";
}

export const CrudButtonGroup: FC<IProps> = ({ orientation }) => {

  const handleEdit = () => {
    console.log("Edit button clicked");
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  return (
    <div className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} justify-center gap-2.5`}>
      <Button variant="outline" onClick={handleEdit} className="bg-transparent border-none shadow-none p-0">
        <PencilSquareIcon className="w-6 h-6" />
      </Button>
      <Button variant="outline" onClick={handleDelete} className="bg-transparent border-none shadow-none p-0">
        <Trash2Icon className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default CrudButtonGroup;









