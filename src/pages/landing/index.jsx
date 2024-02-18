import StoreHeading from "./components/store-heading";
import ProductListings from "./components/product-listings";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings />
    </div>
  );
}
