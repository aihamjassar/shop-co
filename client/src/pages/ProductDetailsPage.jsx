import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ProductDetailsSection } from "../components/ProductDetails/ProductDetailsSection";
import { ProductDetailsTab } from "../components/ProductDetails/ProductDetailsTab";
import { RatingAndReviewsTab } from "../components/ProductDetails/RatingAndReviewsTab";
import { FAQsTab } from "../components/ProductDetails/FAQsTab";
import { getAllProducts, getProduct } from "../store/thunks/productsThunk";
import { ProductsSlider } from "../components/common/ProductsSlider";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, status, error, products } = useSelector(
    (state) => state.products,
  );
  const getRelatedProducts = () => {
    const currentProduct = products.find((p) => p._id === id);
    if (currentProduct) {
      return products.filter((p) => p._id !== id);
    }
    return products.slice(0, 3);
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!currentProduct?.category || !currentProduct?.style) {
      return;
    }

    dispatch(
      getAllProducts({
        categories: currentProduct.category,
        dressStyles: currentProduct.style,
        pageNumber: 1,
        pageSize: 5,
      }),
    );
  }, [dispatch, currentProduct?.category, currentProduct?.style]);

  if (status === "loading" || !currentProduct || currentProduct._id !== id) {
    return (
      <div className="container mx-auto px-5 py-20 text-center text-black/60">
        Loading product...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto px-5 py-20 text-center text-red-600">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <ProductDetailsSection product={currentProduct} />
      <section id="relatedProducts" className="scroll-mt-[72px]">
        <ProductsSlider
          products={getRelatedProducts()}
          title={"Related Products"}
          filter={`?categories=${currentProduct?.category}&dressStyles=${currentProduct.style}`}
        />
      </section>
    </div>
  );
};
