export type ProductItem = {
  id: number;
  name: string;
  size: string;
  quantity: number;
  cost: number;
};

export type CompletedCart = {
  fullName: string;
  membershipNumber: string;
  cart: ProductItem[];
  totalCost: number;
};

export type ProductInventory = {
  id: number;
  name: string;
  sizesAvailable: Array<string>;
  price: number;
  description: string;
};
