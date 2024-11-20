import React, { useEffect } from "react";
import OrderForm from "./components/OrderForm";
import ShoppingCart from "./components/ShoppingCart";
import { useState } from "react";
import { ProductInventory, ProductItem } from "./definitions/definitions";
import { loadProducts } from "./lib/actions";

function App() {
  const [shoppingCart, setShoppingCart] = useState<Array<ProductItem>>([
    // { id: 1, name: "Test", size: "Medium", quantity: 10 },
  ]);
  const [productList, setProductList] = useState<Array<ProductInventory>>([]);
  const [errorMessages, setErrorMessages] = useState("");

  useEffect(() => {
    const callProductList = async () => {
      const PRODUCT_LIST = await loadProducts(setErrorMessages);
      if (PRODUCT_LIST) {
        setProductList(PRODUCT_LIST);
      }
    };

    callProductList();
  }, []);

  const handleDelete = (id: number) => {
    const keptItems = shoppingCart.filter((item) => item.id !== id);

    setShoppingCart(keptItems);
  };

  const handleQuantityAdjustment = (id: number, mode: string) => {
    const adjustedItem: ProductItem =
      shoppingCart.find((item) => item.id === id) ??
      (() => {
        throw new Error("No Item found to adjust");
      })();

    // const remainingItems = shoppingCart.filter((item) => item.id !== id);

    if (mode === "ADD") adjustedItem.quantity++;
    if (mode === "REMOVE") adjustedItem.quantity--;

    const newCart = shoppingCart.map((items) =>
      items.id === id ? adjustedItem : items
    );

    setShoppingCart(newCart);
  };

  return (
    <div className="App">
      <div className="order__page">
        <OrderForm
          productList={productList}
          setShoppingCart={setShoppingCart}
          cart={shoppingCart}
          setErrorMessages={setErrorMessages}
        />
        <ShoppingCart
          setShoppingCart={setShoppingCart}
          cart={shoppingCart}
          handleDelete={handleDelete}
          handleQuantityAdjustment={handleQuantityAdjustment}
        />
        {errorMessages && <p>errorMessages</p>}
      </div>
    </div>
  );
}

export default App;
