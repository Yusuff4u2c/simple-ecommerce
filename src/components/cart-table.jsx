import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import { Fragment, useContext } from "react";
import { toast } from "react-hot-toast";
import Button from "../components/button";
import { formatMoney } from "../libs/utilities";

function CartTable() {
  const { cart, removeFromCart, increaseItemInCart, decreaseItemInCart } =
    useContext(CartContext);

  const subTotal = cart.reduce((accumulator, cartItem) => {
    const productPrice = cartItem.product.price;
    const quantity = cartItem.quantity;
    return accumulator + productPrice * quantity;
  }, 0);

  // const removed = removeFromCart(cart);
  return (
    <div className="min-h-80 max-w-4xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-purple-500 border-b border-purple-100">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
              Price
            </th>
            <th className="font-primary font-normal px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-50">
          {/* cart item */}
          {cart.map((cartItem, index) => (
            <Fragment key={index}>
              <tr className="text-sm sm:text-base text-gray-600 text-center">
                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                  <img
                    src={cartItem.product.image}
                    alt={"random image"}
                    height={64}
                    width={64}
                    className={`hidden sm:inline-flex`}
                  />
                  <a href={``} className="pt-1 hover:text-purple-600">
                    {cartItem.product.title}
                  </a>
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <div className="flex">
                    <Button
                      iconLeft={<FaMinus />}
                      disabled={cartItem.quantity === 1}
                      onClick={() => {
                        if (decreaseItemInCart(cartItem.product))
                          toast.success("Product quantity updated");
                      }}
                    />
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      min="1"
                      step="1"
                      onChange={console.log}
                      value={cartItem.quantity}
                      disabled
                      className="text-gray-900 py-2 px-6 border border-gray-300 w-16 rounded-sm focus:border-purple-100 focus:ring-purple-100 h-11"
                    />
                    <Button
                      iconLeft={<FaPlus />}
                      onClick={() => {
                        if (increaseItemInCart(cartItem.product))
                          toast.success("Product quantity updated");
                      }}
                    />
                  </div>
                </td>
                <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                  <span className="text-lg">
                    {cartItem.product.price * cartItem.quantity}
                  </span>
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <button
                    aria-label="delete-item"
                    className=""
                    onClick={() => {
                      if (removeFromCart(cartItem.product))
                        toast.success("Item removed from cart");
                    }}
                  >
                    <FaTimes className="w-8 h-8 text-purple-500 border border-purple-500 p-1 hover:bg-purple-50" />
                  </button>
                </td>
              </tr>
            </Fragment>
          ))}
          {/* End of cart item */}
          {/* sub total */}
          <tr className="text-center">
            <td></td>
            <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
              Subtotal
            </td>
            <td className="font-primary text-lg text-purple-500 font-medium px-4 sm:px-6 py-4">
              <span className="text-lg">{formatMoney(subTotal)}</span>
            </td>
            <td></td>
          </tr>
          {/* end of sub total */}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
