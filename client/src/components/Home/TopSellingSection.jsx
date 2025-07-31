import image from "../../assets/products/image-7.png";
import { ProductsSlider } from "../common/ProductsSlider";

export const TopSellingSection = () => {
  const products = [
    {
      _id: "1",
      name: "T-SHIRT WITH TAPE DETAILS 10000000",
      rating: 4,
      price: 120,
      discount: 0,
      img: image,
    },
    {
      _id: "2",
      name: "SKINNY FIT JEANS",
      rating: 3.5,
      price: 180,
      discount: 20,
      img: image,
    },
    {
      _id: "3",
      name: "CHECKERED SHIRT",
      rating: 4.5,
      price: 180,
      discount: 50,
      img: image,
    },
    {
      _id: "4",
      name: "SLEEVE STRIPED T-SHIRT",
      rating: 4.5,
      price: 180,
      discount: 20,
      img: image,
    },
  ];
  return (
    <section>
      <ProductsSlider products={products} title={"Top Selling"} />
    </section>
  );
};
