import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductDetailsSection } from "../components/ProductDetails/ProductDetailsSection";
import { ProductDetailsTab } from "../components/ProductDetails/ProductDetailsTab";
import { RatingAndReviewsTab } from "../components/ProductDetails/RatingAndReviewsTab";
import { FAQsTab } from "../components/ProductDetails/FAQsTab";
import { getProduct } from "../store/thunks/productsThunk";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, status, error } = useSelector((state) => state.products);
  const [activeTab, setActiveTab] = useState("rating & reviews");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (status === "loading" || !currentProduct || currentProduct._id !== id) {
    return <div className="container mx-auto px-5 py-20 text-center text-black/60">Loading product...</div>;
  }

  if (status === "failed") {
    return <div className="container mx-auto px-5 py-20 text-center text-red-600">{error || "Product not found."}</div>;
  }

  return (
    <div className="container mx-auto">
      <ProductDetailsSection product={currentProduct} />
      <div className="px-5 md:px-8">
        <div className="min-h-10 shadow-md border-b border-black/60 flex" role="tablist">
          {["product details", "rating & reviews", "FAQs"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-center leading-6 text-black/60 cursor-pointer hover:bg-black/10 transition-colors ${activeTab === tab ? "text-black border-b-2 border-black" : ""}`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab === "rating & reviews" ? "Rating & Reviews" : tab === "FAQs" ? "FAQs" : "Product Details"}
            </button>
          ))}
        </div>
        {activeTab === "product details" && <ProductDetailsTab />}
        {activeTab === "rating & reviews" && <RatingAndReviewsTab />}
        {activeTab === "FAQs" && <FAQsTab />}
      </div>
    </div>
  );
};
