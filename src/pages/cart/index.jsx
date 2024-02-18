import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CartTable from "../../components/cart-table";
import PageTitle from "../../components/page-title";
import { Link } from "react-router-dom";

function CartPage() {
  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <PageTitle text="Your Cart" />
      <CartTable />
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <Link
          to={"/checkout"}
          aria-label="checkout-products"
          className="bg-purple-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-purple-100 focus:outline-none w-full hover:bg-purple-600 rounded-sm"
        >
          Check Out
          <FaArrowRight className="w-4 ml-2 inline-flex" />
        </Link>

        <Link
          to={"/"}
          aria-label="back-to-products"
          className="border border-purple-500 text-purple-500 text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-purple-100 focus:outline-none w-full hover:bg-purple-50 rounded-sm"
        >
          <FaArrowLeft className="w-4 mr-2 inline-flex" />
          Back To All Products
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
