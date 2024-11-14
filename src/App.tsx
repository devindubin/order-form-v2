import React from "react";
import OrderForm from "./components/OrderForm";
import ShoppingCart from "./components/ShoppingCart";
import { useState } from "react";
import { ProductItem } from "./definitions/definitions";

function App() {
  const [shoppingCart, setShoppingCart] = useState<Array<ProductItem>>([
    // { id: 1, name: "Test", size: "Medium", quantity: 10 },
  ]);

  return (
    <div className="App">
      <div className="order__page">
        <OrderForm setShoppingCart={setShoppingCart} cart={shoppingCart} />
        <ShoppingCart cart={shoppingCart} />
      </div>
    </div>
  );
}

export default App;
