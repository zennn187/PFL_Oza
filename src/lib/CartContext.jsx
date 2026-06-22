import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
      return sum + numericPrice * item.qty;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== productName));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}