import { CompletedCart, ProductInventory } from "../definitions/definitions";

export const loadProducts = async (
  setErrorMessages: React.Dispatch<React.SetStateAction<string>>
) => {
  //TODO: fix request options type definition in parameters
  // Call the products page api
  const productsDbLink: URL = new URL("http://localhost:3500/products");
  try {
    const response = await fetch(productsDbLink);
    if (!response.ok) {
      throw Error("Error fetching product list");
    }
    const products: ProductInventory[] = await response.json();
    return products;
  } catch (err: unknown) {
    if (err instanceof Error) {
      setErrorMessages(err.message);
    }
  }

  // If !response.ok, use the json-server db
};

export const submitOrder = async (
  orderDetails: CompletedCart,
  setErrorMessages: React.Dispatch<React.SetStateAction<string>>
) => {
  const API_URL = new URL("http://localhost:3500/orders");

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderDetails),
  };

  try {
    const response = await fetch(API_URL, postOptions);
    if (!response.ok) throw Error("Failed to save order");
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessages(error.message);
    }
  }
};
