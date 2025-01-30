import { FC, useCallback, useEffect, useState } from "react";

import { apiUsers } from "@/api/apiUsers.ts";
import { ICart } from "@/common/interfaces/carts.interfaces.ts";
import { IUserCartResponse } from "@/common/interfaces/users.interfaces.ts";
import { UserCart } from "@/components/Carts/UserCart/UserCart.tsx";

type IProps = {
  userId: string;
};

export const TestDrawerCard: FC<IProps> = ({ userId }) => {
  const [carts, setCarts] = useState<ICart[]>([]);
  const getCarts = useCallback(
    async () => await apiUsers.userByIdCarts(userId),
    [userId],
  );
  useEffect(() => {
    (async () => {
      try {
        const { carts } = (await getCarts()) as IUserCartResponse;
        if (carts) {
          setCarts(carts);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [getCarts]);
  return (
    <>
      {!!carts.length &&
        carts.map((item, index) => <UserCart key={index} cart={item} />)}
    </>
  );
};
