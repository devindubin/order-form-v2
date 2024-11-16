import React from "react";
import { ProductItem } from "../definitions/definitions";
import DeleteIcon from "@mui/icons-material/Delete";
function ShoppingCart({
  cart,
  setShoppingCart,
}: {
  cart: ProductItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<ProductItem[]>>;
}) {
  // TODO: write delete from cart function

  const handleDelete = (id: number) => {
    const keptItems = cart.filter((item) => item.id !== id);

    setShoppingCart(keptItems);
  };

  return (
    <div className="card-cart">
      <div className="shopping__cart">
        {/* <ul className="shopping__list"> */}
        {cart.length > 0 && (
          <div className="shopping__list">
            {cart.map((item: ProductItem, index: number) => {
              return (
                <p className="shopping__list__item" key={item.id}>
                  {index + 1}) | {item.name} | {item.size} | {item.quantity} |{" "}
                  {item.cost * item.quantity} |
                  <DeleteIcon
                    className="shopping__list__item__deleteicon"
                    onClick={() => handleDelete(item.id)}
                  />
                </p>
              );
            })}
          </div>
        )}
        {/* </ul> */}
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
