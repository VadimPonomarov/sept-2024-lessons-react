import * as React from "react";
import { FC } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCartIcon } from "lucide-react";
import { TestDrawerCard } from "@/components/TestDrawerCard.tsx";

type IProps = {
  userId: string;
};

export const TestDrawer: FC<IProps> = ({ userId }) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <span className="flex items-center">
              <ShoppingCartIcon className="h-6 w-6 text-red-500" />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <span className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6 text-red-500" />
              </span>
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
        <Button variant="outline">
          <span className="flex items-center">
            <ShoppingCartIcon className="h-6 w-6 text-red-500" />
          </span>
        </Button>
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
