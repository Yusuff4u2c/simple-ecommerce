import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Navigation = () => {
  const { cart } = useContext(CartContext);
  return (
    <header className="border-b border-purple-50 sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <Link to="/">
          <h1 className="flex no-underline">
            <img
              height="32"
              width="32"
              alt="logo"
              className="h-8 w-8 mr-1 object-contain"
              src="/icon.svg"
            />
            <span className="text-xl font-primary font-bold tracking-tight pt-1">
              Ecommerce
            </span>
          </h1>
        </Link>
        <div>
          <Link to="/cart" className="relative" aria-label="cart">
            <FaShoppingCart className="text-purple-500 w-6 m-auto" />
            <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs bg-yellow-300 text-black font-semibold rounded-full transform translate-x-[80%] -translate-y-3">
              {cart.length}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
