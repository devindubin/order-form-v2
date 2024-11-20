import React from "react";
import { ProductItem } from "../definitions/definitions";

import OrderItem from "./OrderItem";
function ShoppingCart({
  cart,
  setShoppingCart,
  handleDelete,
  handleQuantityAdjustment,
}: {
  cart: ProductItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  handleDelete: (id: number) => void;
  handleQuantityAdjustment: (id: number, mode: string) => void;
}) {
  return (
    <div className="card-cart">
      <div className="shopping__cart">
        {cart.length > 0 && (
          <div className="shopping__list">
            {cart.map((item: ProductItem, index: number) => {
              return (
                <OrderItem
                  key={item.id}
                  item={item}
                  handleDelete={handleDelete}
                  handleQuantityAdjustment={handleQuantityAdjustment}
                />
              );
            })}
          </div>
        )}

        {!cart.length && <p>No Items Added To Cart</p>}
      </div>
      <p>
        Total Costs{" "}
        {cart.reduce((total, item) => total + item.cost * item.quantity, 0)}
      </p>
    </div>
  );
}

export default ShoppingCart;
