import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const addToCart = () => {
    setCartItemCount((prevCount) => prevCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
