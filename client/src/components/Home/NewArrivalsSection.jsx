import { ProductsSlider } from "../common/ProductsSlider";
import { products } from "../../data/products";

export const NewArrivalsSection = () => {
  return (
    <section id="newArrivalsSection" className="scroll-mt-[72px]">
      <ProductsSlider products={products} title={"New Arrivals"} />
    </section>
  );
};
