import { ProductsSlider } from "../common/ProductsSlider";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/thunks/productsThunk";
import { useEffect } from "react";

export const TopSellingSection = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getAllProducts({
        sortBy: "selling-desc",
        pageNumber: 1,
        pageSize: 4,
      }),
    );
  }, [dispatch]);
  return (
    <section id="topSellingSection" className="scroll-mt-20">
      <ProductsSlider products={products} title={"Top Selling"} sortBy={'selling-desc'} />
    </section>
  );
};
