import React from "react";
import { ProductItem } from "../definitions/definitions";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function OrderItem({
  item,
  handleDelete,
  handleQuantityAdjustment,
}: {
  item: ProductItem;
  handleDelete: (id: number) => void;
  handleQuantityAdjustment: (id: number, mode: string) => void;
}) {
  return (
    <div className="item-card">
      <div className="item__text-details">
        <div className="item-card__top-section">
          <p className="item-name">
            Item: <span>{item.name}</span>
          </p>
          <p className="item-size">
            Size: <span>{item.size}</span>
          </p>
        </div>
        <div className="item-card__bottom-section">
          <div className="item__quantity-price">
            <p className="item-quantity">
              Quantity: <span>{item.quantity}</span>
            </p>
            <p className="item-price">
              Price: <span>{item.cost}</span>
            </p>
          </div>
          <p className="item-order-cost">
            Order Cost: <span>{item.quantity * item.cost}</span>
          </p>
        </div>
      </div>
      <div className="edit-icons">
        <AddIcon
          className="shopping__list__item__addicon"
          onClick={() => {
            handleQuantityAdjustment(item.id, "ADD");
          }}
        />
        <DeleteIcon
          className="shopping__list__item__deleteicon"
          onClick={() => handleDelete(item.id)}
        />
        <RemoveIcon
          className="shopping__list__item__removeicon"
          onClick={() => {
            handleQuantityAdjustment(item.id, "REMOVE");
          }}
        />
      </div>
    </div>
  );
}

export default OrderItem;
