import { ProductsSlider } from "../common/ProductsSlider";
import { products } from "../../data/products";

export const TopSellingSection = () => {
  return (
    <section id="topSellingSection" className="scroll-mt-20">
      <ProductsSlider products={products} title={"Top Selling"} />
    </section>
  );
};
