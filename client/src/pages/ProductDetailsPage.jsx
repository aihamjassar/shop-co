import { useState } from "react";
import { ProductDetailsSection } from "../components/ProductDetails/productDetailsSection";
import { ProductDetailsTab } from "../components/ProductDetails/ProductDetailsTab";
import { RatingAndReviewsTab } from "../components/ProductDetails/RatingAndReviewsTab";
import { FAQsTab } from "../components/ProductDetails/FAQsTab";
export const ProductDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("rating & reviews");
  return (
    <div className="container mx-auto">
      <ProductDetailsSection />
      <div className="px-5 md:px-8">
        <div
          className="min-h-10 shadow-md border-b border-black/60 flex"
          role="tablist"
        >
          <button
            className={`flex-1/3 text-center leading-6 text-black/60 cursor-pointer hover:bg-black/10 transition-colors ${
              activeTab === "product details" &&
              "text-black/100 border-b-2 border-black"
            }`}
            onClick={() => setActiveTab("product details")}
            role="tab"
          >
            Product Details
          </button>
          <button
            className={`flex-1/3 text-center leading-6 text-black/60 cursor-pointer hover:bg-black/10 transition-colors ${
              activeTab === "rating & reviews" &&
              "text-black/100 border-b-2 border-black"
            }`}
            onClick={() => setActiveTab("rating & reviews")}
            role="tab"
          >
            Rating & Reviews
          </button>
          <button
            className={`flex-1/3 text-center leading-6 text-black/60 cursor-pointer hover:bg-black/10 transition-colors ${
              activeTab === "FAQs" && "text-black/100 border-b-2 border-black"
            }`}
            onClick={() => setActiveTab("FAQs")}
            role="tab"
          >
            FAQs
          </button>
        </div>
        {activeTab === "product details" && <ProductDetailsTab />}
        {activeTab === "rating & reviews" && <RatingAndReviewsTab />}
        {activeTab === "FAQs" && <FAQsTab />}
      </div>
    </div>
  );
};
