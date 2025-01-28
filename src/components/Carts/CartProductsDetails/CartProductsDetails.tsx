import { FC } from "react";

import { IProducts } from "@/common/interfaces/carts.interfaces.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

type IProps = {
  products: IProducts;
};

export const CartProductsDetails: FC<IProps> = ({ products }) => {
  return (
    <Table>
      <TableCaption>A list of products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">Disc</TableHead>
          <TableHead className="text-right">DiscTotal</TableHead>
          <TableHead>Thumbnail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{products.id}</TableCell>
          <TableCell>{products.title}</TableCell>
          <TableCell className="text-right">{products.price}</TableCell>
          <TableCell className="text-right">{products.quantity}</TableCell>
          <TableCell className="text-right">
            {Number(products.total).toFixed(2)}
          </TableCell>
          <TableCell className="text-right">{products.discountPercentage}</TableCell>
          <TableCell className="text-right">
            {products.discountedTotal.toFixed(2)}
          </TableCell>
          <TableCell className="text-right">
            <img src={products.thumbnail} alt={products.title} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
