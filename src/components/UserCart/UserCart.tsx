import { FC, useEffect } from "react";
import { ICart } from "@/common/interfaces/carts.interfaces.ts";
import { CartProductsDetails } from "@/components/CartProductsDetails/CartProductsDetails.tsx";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

type IProps = {
  cart: ICart;
};

export const UserCart: FC<IProps> = ({ cart }) => {
  const { userId } = useParams();
  useEffect(() => {}, [userId]);
  return (
    <div
      className={
        !userId
          ? "max-h-[250px] overflow-auto"
          : "fixed mb-5 max-h-screen max-w-[47%] overflow-auto"
      }
    >
      <div>Total: {cart.total}</div>
      <div>Total products: {cart.totalProducts}</div>
      <div>Discounted total: {cart.discountedTotal}</div>
      <div>Total quantity: {cart.totalQuantity}</div>
      {cart.products.map((item) => (
        <CartProductsDetails key={v4()} products={item} />
      ))}
    </div>
  );
};
