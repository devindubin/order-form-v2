import React, { useState } from "react";
import {
  CompletedCart,
  ProductInventory,
  ProductItem,
} from "../definitions/definitions";
import { submitOrder } from "../lib/actions";

// import { ShoppingCart } from "./definitions/definitions";
function OrderForm({
  setShoppingCart,
  cart,
  productList,
  setErrorMessages,
}: {
  setShoppingCart: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  cart: ProductItem[];
  productList: ProductInventory[];
  setErrorMessages: React.Dispatch<React.SetStateAction<string>>;
}) {
  const productListMap = productList;

  const [fullName, setFullName] = useState("");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [itemChoice, setItemChoice] = useState("");
  const [sizeChoice, setSizeChoice] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const id = cart.length ? cart[cart.length - 1].id + 1 : 1;

    const addedItem: ProductItem = {
      id: id,
      name: itemChoice,
      size: sizeChoice,
      quantity: quantity,
      cost: itemChoice === "Tshirt" ? 10 : itemChoice === "Sweatshirt" ? 15 : 5,
    };

    const newCart = [...cart, addedItem];
    setShoppingCart(newCart);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log();
    const submittedCart: CompletedCart = {
      fullName: fullName,
      membershipNumber: membershipNumber,
      cart: cart,
      totalCost: cart.reduce(
        (total, current) => total + current.cost * current.quantity,
        0
      ),
    };

    submitOrder(submittedCart, setErrorMessages);
  };

  const selectedProduct = productListMap.find(
    (product) => product.name === itemChoice
  );
  const availableSizes = selectedProduct?.sizesAvailable || [];

  return (
    <main>
      <div className="card">
        <form className="order__form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="membershipNumber">Membership Number</label>
          <input
            type="text"
            name="membershipNumber"
            id="membershipNumber"
            value={membershipNumber}
            onChange={(e) => setMembershipNumber(e.target.value)}
          />
          {productListMap && (
            <fieldset>
              <label htmlFor="productSelect">
                Pick an item to add to your cart!
              </label>
              <select
                name="productSelect"
                id="productSelect"
                value={itemChoice}
                onChange={(e) => setItemChoice(e.target.value)}
                // defaultValue=""
              >
                <option value="" disabled hidden>
                  Choose
                </option>
                {productListMap.map((product) => {
                  return (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="sizeSelect">Choose a size</label>
              <select
                name="sizeSelect"
                id="sizeSelect"
                value={sizeChoice}
                onChange={(e) => setSizeChoice(e.target.value)}
                disabled={!availableSizes.length}
              >
                <option value="" disabled hidden>
                  Pick Size
                </option>
                {availableSizes.map((size) => {
                  return (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="quantity">Quantity</label>
              <input
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />

              <button onClick={handleAddToCart} type="button" name="addToCart">
                Add To Cart
              </button>
            </fieldset>
          )}
          {!productListMap && <p>No Products Found</p>}
          <button type="submit">Submit Order</button>
        </form>
      </div>
    </main>
  );
}

export default OrderForm;
