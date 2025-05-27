import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };
  
  const saveCartToDB = async (userId, items) => {
  await axios.post("http://localhost:8000/cart/save", { userId, items });
  };

  const clearCart = () => setCart([]);

const loadCartFromDB = async (userId) => {
  const res = await axios.get(`http://localhost:8000/cart/${userId}`);
  const dbItems = res.data.items || [];
  setCart((prevCart) => {
    
    const merged = [...dbItems];
    prevCart.forEach(localItem => {
      const dbItem = merged.find(item => item._id === localItem._id);
      if (dbItem) {
        dbItem.quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });
    return merged;
  });
};
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{cart,
      saveCartToDB,
      loadCartFromDB,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      removeFromCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}