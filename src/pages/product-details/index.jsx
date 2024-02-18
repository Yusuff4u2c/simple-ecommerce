import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loading from "./components/loading";
import { CartContext } from "../../contexts/CartContext";
import Button from "../../components/button";
import Error from "./components/error";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";

function ProductPage() {
  const {
    cart,
    addToCart,
    decreaseItemInCart,
    increaseItemInCart,
    getItemInCart,
  } = useContext(CartContext);
  const [quantityInCart, setQuantityInCart] = useState();
  const { productId } = useParams();
  const [setProductQty] = useState(1);

  const getQuantityInCart = (product) => {
    const cartItem = getItemInCart(product.id);
    if (cartItem) setQuantityInCart(cartItem.quantity);
  };

  const handleAddToCart = () => {
    const isAdded = addToCart(product);
    if (isAdded) toast.success("Product added to cart");
    else toast.success("Product already added to cart");
  };

  const fetchProductDetails = async () => {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  };

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: fetchProductDetails,
  });

  // fetch our products
  useEffect(() => {
    if (product) getQuantityInCart(product);
  }, [cart, product]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  if (!product) return <p className="text-center text-5xl">Product Invalid</p>;

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      {/* Product section */}
      <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        {/* Product Image */}
        <div className="w-full md:w-1/2 max-w-md border border-purple-50 bg-white rounded shadow-lg">
          <div className="relative h-96 overflow-hidden">
            <img
              src={product.image}
              alt={"product description"}
              className="transform duration-500 ease-in-out hover:scale-105 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
          <Link
            to="/"
            aria-label="back-to-products"
            className="border border-purple-500 text-purple-500 text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
      justify-center items-center focus:ring-1 focus:ring-purple-100 focus:outline-none w-full hover:bg-purple-50 rounded-sm"
          >
            <FaArrowLeft className="w-4 mr-2 inline-flex" />
            Back To All Products
          </Link>

          <div className=" font-primary">
            <h1 className="leading-relaxed font-extrabold text-3xl text-purple-500 py-2 sm:py-4">
              {product.title}
            </h1>
            <p className="font-medium text-lg">{product.description}</p>
            <div className="text-xl text-purple-500 font-medium py-4 px-1">
              <span className={"text-lg"}>${product.price}</span>
            </div>
          </div>

          {/* <ProductForm
            title={productData.title}
            handle={productData.handle}
            variants={productData.variants.edges}
            mainImg={productData.images.edges[0].node}
            setVariantPrice={setVariantPrice}
          /> */}

          <div className="w-full">
            <div className="flex justify-start space-x-2 w-full mb-6">
              <div className="flex flex-col items-start space-y-1 flex-grow-0">
                <label className="text-gray-500 text-base">Qty.</label>
                <div className="flex items-center my-6 gap-4">
                  <Button
                    iconLeft={<FaMinus />}
                    disabled={!quantityInCart || quantityInCart === 1}
                    onClick={() => {
                      if (decreaseItemInCart(product))
                        toast.success("Product quantity updated");
                    }}
                  />
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    min="1"
                    step="1"
                    onChange={(e) => {
                      setProductQty(e.currentTarget.value);
                    }}
                    value={quantityInCart ?? 0}
                    disabled
                    className="text-gray-900 py-2 px-6 border border-gray-300 w-16 rounded-sm focus:border-purple-100 focus:ring-purple-100 h-11"
                  />
                  <Button
                    iconLeft={<FaPlus />}
                    disabled={!quantityInCart}
                    onClick={() => {
                      if (increaseItemInCart(product))
                        toast.success("Product quantity updated");
                    }}
                  />
                </div>
              </div>
            </div>

            <Button
              aria-label="cart-button"
              onClick={handleAddToCart}
              title={"Add to Cart"}
              iconRight={<FaShoppingCart className="w-5 ml-2" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
