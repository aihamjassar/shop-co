import { useEffect } from "react";
import { ProductsSlider } from "../common/ProductsSlider";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/thunks/productsThunk";

export const NewArrivalsSection = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getAllProducts({
        sortBy: "newest",
        pageNumber: 1,
        pageSize: 4,
      }),
    );
  }, [dispatch]);

  return (
    <section id="newArrivalsSection" className="scroll-mt-[72px]">
      <ProductsSlider
        products={products}
        title={"New Arrivals"}
        filter={"?sortBy=newest"}
      />
    </section>
  );
};
