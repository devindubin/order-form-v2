import React from "react";
import { ProductItem } from "../definitions/definitions";
function ShoppingCart({ cart }: { cart: ProductItem[] }) {
  // TODO: write delete from cart function

  return (
    <div className="shopping__cart">
      <ul className="shopping__list">
        {cart.length > 0 &&
          cart.map((item: ProductItem, index: number) => {
            return (
              <li className="shopping__list__item" key={item.id}>
                {item.id} | {item.name} | {item.size} | {item.quantity}
              </li>
            );
          })}
        {!cart.length && <p>No Items Added To Cart</p>}
      </ul>
    </div>
  );
}

export default ShoppingCart;
