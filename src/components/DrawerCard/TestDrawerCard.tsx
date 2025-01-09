import { FC, useEffect, useState } from "react";
import { ICart } from "@/interfaces/carts.interfaces.ts";
import { usersService } from "@/api/usersService.ts";
import { UserCart } from "@/components/UserCart/UserCart.tsx";

type IProps = {
  userId: string;
};

export const TestDrawerCard: FC<IProps> = ({ userId }) => {
  const [carts, setCarts] = useState<ICart[]>([]);
  const getCarts = async () => await usersService.userByIdCarts(userId);
  useEffect(() => {
    (async () => {
      try {
        const { carts } = await getCarts();
        if (carts) {
          setCarts(carts);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <>
      {!!carts.length &&
        carts.map((item, index) => <UserCart key={index} cart={item} />)}
    </>
  );
};
