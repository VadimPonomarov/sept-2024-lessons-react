import { ShoppingCartIcon } from "lucide-react";
import * as React from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";

import { useMediaQuery } from "@/common/hooks/useMediaQuery.tsx";
import { TestDrawerCard } from "@/components/Cards/DrawerCard/TestDrawerCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";

interface IProps {
  userId: string;
  setOpen?: (open: boolean) => void;
}

export const UserCartModal: FC<IProps> = ({ userId }) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { userId: user_id } = useParams();
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {!user_id && (
            <Button variant="outline">
              <span className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6 text-red-500" />
              </span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <span className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6 text-red-500" />
              </span>
              Shopping Cart
            </DialogTitle>
          </DialogHeader>
          <TestDrawerCard userId={userId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {!user_id && (
          <Button variant="outline">
            <span className="flex items-center">
              <ShoppingCartIcon className="h-6 w-6 text-red-500" />
            </span>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-w-screen sm:max-w-md">
        <TestDrawerCard userId={userId} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
