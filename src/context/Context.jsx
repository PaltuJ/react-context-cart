import { faker } from "@faker-js/faker";
import React, { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";

faker.seed(99);
const cartContext = createContext();

const Context = ({ children }) => {
  const fakeProducts = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));
  // console.log(fakeProducts);

  const [state, dispatch] = useReducer(cartReducer, {
    products: fakeProducts,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    sort: null,
  });
  // console.log(productState);
  return (
    <cartContext.Provider
      value={{ state, dispatch, productState, productDispatch }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(cartContext);
};
