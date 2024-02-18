import {
  FaArrowLeft,
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import PageTitle from "../../components/page-title";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";
import Button from "../../components/button";
import { Fragment } from "react";
import { formatMoney } from "../../libs/utilities";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

function Checkout() {
  const { cart } = useCart();

  const subTotal = cart.reduce((accumulator, cartItem) => {
    const productPrice = cartItem.product.price;
    const quantity = cartItem.quantity;
    return accumulator + productPrice * quantity;
  }, 0);

  const config = {
    public_key: "FLWPUBK_TEST-7f7f069493b78f7a8422ba0d2b6b2e94-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "josephajibodu@gmail.com",
      phone_number: "08167297386",
      name: "Joseph Ajibodu",
    },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://avatars.githubusercontent.com/u/78092933?v=4",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      // verify the transaction
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      toast.error("Payment Cancelled. What went wrong?");
    },
  };

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <PageTitle text="Checkout Now" />
      <div className="grid grid-cols-2">
        <div className="min-h-80 max-w-4xl my-4 sm:my-8 mx-auto w-full">
          <table className="mx-auto">
            <thead>
              <tr className="uppercase text-xs sm:text-sm text-purple-500 border-b border-purple-100">
                <th className="font-primary font-normal px-6 py-4">Product</th>
                <th className="font-primary font-normal px-6 py-4">Quantity</th>
                <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {/* cart item */}
              {cart.map((cartItem, index) => (
                <Fragment key={index}>
                  <tr className="text-sm sm:text-base text-gray-600 text-center">
                    <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                      <a href={``} className="pt-1 hover:text-purple-600">
                        {cartItem.product.title}
                      </a>
                    </td>
                    <td className="font-primary font-medium px-4 sm:px-6 py-4">
                      <div className="flex">{cartItem.quantity}</div>
                    </td>
                    <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <span className="text-lg">
                        {cartItem.product.price * cartItem.quantity}
                      </span>
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
                  <span className="text-lg">₦{formatMoney(subTotal)}</span>
                </td>
                <td></td>
              </tr>
              {/* end of sub total */}
            </tbody>
          </table>
        </div>

        <div>
          {/* <form> */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="text-gray-900 py-2 px-6 border border-gray-300 rounded-sm focus:border-purple-100 focus:ring-purple-100 h-11 w-full max-w-sm"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your Email Address"
              className="text-gray-900 py-2 px-6 border border-gray-300 rounded-sm focus:border-purple-100 focus:ring-purple-100 h-11 w-full max-w-sm"
            />
          </div>
          <Button type={"button"} className={"w-fit"}>
            Pay ₦{formatMoney(subTotal)} Now
          </Button>

          <FlutterWaveButton
            className="py-2 px-3 my-3 h-11 bg-purple-500 text-white rounded-sm font-primary font-semibold text-xl flex justify-center items-center  hover:bg-purple-600 disabled:bg-purple-600/20 disabled:cursor-not-allowed cursor-pointer w-fit"
            {...fwConfig}
          />
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
