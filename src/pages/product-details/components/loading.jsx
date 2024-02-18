import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      {/* Product section */}
      <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        {/* Product Image */}
        <div className="w-full md:w-1/2 max-w-md border border-purple-50 bg-white rounded shadow-lg">
          <div className="relative h-96 overflow-hidden bg-gray-500 animate-pulse"></div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
          <a
            href="/"
            aria-label="back-to-products"
            className="bg-gray-400 h-12 py-2 px-3 rounded-sm animate-pulse"
          ></a>

          <div className=" font-primary">
            <h1 className="bg-gray-400 h-6 w-[80%] animate-pulse" />
            <p className="bg-gray-300 h-6 w-[90%] mt-3 animate-pulse" />
            <div className="text-xl text-purple-500 font-medium mt-5 py-4 px-1">
              <span
                className={"bg-gray-300 h-6 w-[30%] mt-3 animate-pulse block"}
              ></span>
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
            <Skeleton height={"48px"} />
          </div>
        </div>
      </div>
    </div>
  );
}
