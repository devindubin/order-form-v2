import React, { useState } from "react";
import { CompletedCart, ProductItem } from "../definitions/definitions";
// import { ShoppingCart } from "./definitions/definitions";
function OrderForm({
  setShoppingCart,
  cart,
}: {
  setShoppingCart: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  cart: ProductItem[];
}) {
  const productList = [
    { name: "Tshirt" },
    { name: "Sweatshirt" },
    { name: "Flag" },
  ];

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
    };

    console.log(submittedCart);
  };

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
            {productList.map((product) => {
              return (
                <option key={product.name} value={product.name}>
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
          >
            <option
              value=""
              // defaultValue={"Pick Size"}
              disabled
              hidden
            >
              Pick Size
            </option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          <label htmlFor="quantity">Quantity</label>
          <input
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button type="submit">Submit Order</button>
          <button onClick={handleAddToCart} type="button" name="addToCart">
            Add To Cart
          </button>
        </form>
      </div>
    </main>
  );
}

export default OrderForm;
