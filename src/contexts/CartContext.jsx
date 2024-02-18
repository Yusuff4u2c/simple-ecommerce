/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

// CartItem { product: {}, quantity: 1}

export const CartContext = createContext({
  cart: [],
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!product || !product.id)
      throw Error("You must specify the product to add.");

    const itemIndex = cart.findIndex(
      (cartItem) => cartItem.product.id === product.id
    );

    if (itemIndex > -1) {
      return false;
    } else {
      const cartItem = { product, quantity: 1 };

      setCart([...cart, cartItem]);
      console.log(cart);

      return true;
    }
  };

  const removeFromCart = (product) => {
    const itemIndex = cart.findIndex(
      (cartItem) => cartItem.product.id === product.id
    );

    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      setCart([...cart]);
      return true;
    }

    return false;
  };

  const increaseItemInCart = (product) => {
    if (!product || !product.id)
      throw Error("You must specify the product to add.");

    const itemIndex = cart.findIndex(
      (cartItem) => cartItem.product.id === product.id
    );
    if (itemIndex > -1) {
      //   const item = cart[itemIndex];
      //   const newCartItem = { ...item, quantity: item.quantity + 1 };
      //   const newCart = [
      //     ...cart.slice(0, itemIndex),
      //     newCartItem,
      //     ...cart.slice(itemIndex + 1),
      //   ];
      cart[itemIndex].quantity = cart[itemIndex].quantity + 1;
      const newCart = [...cart];
      setCart(newCart);
      return true;
    }

    return false;
  };

  const decreaseItemInCart = (product) => {
    if (!product || !product.id)
      throw Error("You must specify the product to add.");

    const itemIndex = cart.findIndex(
      (cartItem) => cartItem.product.id === product.id
    );
    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity = cart[itemIndex].quantity - 1;
        const newCart = [...cart];
        setCart(newCart);
      } else {
        const newCart = cart.splice(itemIndex, 1);
        setCart(newCart);
      }

      return true;
    }

    return false;
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemInCart = (id) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.product.id === id);
    if (itemIndex > -1) return cart[itemIndex];
    return null;
  };

  // Read data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      const cart = JSON.parse(storedData);
      if (cart.length > 0) setCart(cart);
    }
  }, []);

  // Write data to localStorage whenever it changes
  useEffect(() => {
    if (typeof cart !== "object") return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseItemInCart,
        decreaseItemInCart,
        clearCart,
        getItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
