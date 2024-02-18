import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function useCart() {
    const {
        cart,
        addToCart,
        removeFromCart,
        increaseItemInCart,
        decreaseItemInCart,
        clearCart,
        getItemInCart
    } =
    useContext(CartContext);

    return {
        cart,
        addToCart,
        removeFromCart,
        increaseItemInCart,
        decreaseItemInCart,
        clearCart,
        getItemInCart,
    }
}