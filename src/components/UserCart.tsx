import { FC, useEffect } from "react";
import { ICart } from "@/models/carts.interfaces.ts";
import { CartProductsDetails } from "@/components/CartProductsDetails.tsx";
import { useParams } from "react-router-dom";

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
          : "fixed mb-5 max-h-screen overflow-auto"
      }
    >
      <div>Total: {cart.total}</div>
      <div>Total products: {cart.totalProducts}</div>
      <div>Discounted total: {cart.discountedTotal}</div>
      <div>Total quantity: {cart.totalQuantity}</div>
      {cart.products.map((item) => (
        <CartProductsDetails key={userId} products={item} />
      ))}
    </div>
  );
};
