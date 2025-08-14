import { useState } from "react";
import { Stars } from "../common/Stars";
import { Check, Minus, Plus } from "lucide-react";
import { Slider } from "../common/Slider";

const product = {
  _id: "1",
  name: "T-SHIRT WITH TAPE DETAILS",
  rating: 4,
  price: 120,
  discount: 10,
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  images: ["/image 1.png", "/image 5.png", "/image 6.png"],
  colors: ["#4F4631", "#31344F", "#314F4A"],
  sizes: ["Small", "Medium", "Large", "X-Large"],
};
export const ProductDetailsSection = () => {
  const { name, images, rating, price, discount, description, colors, sizes } =
    product;

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="px-5 md:px-8 py-5 mb-16">
      <div className="text-black/60">Home &gt; Shop &gt; Man &gt; Casual</div>

      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <div className="md:max-w-80 lg:min-w-96">
          <Slider>
            {images.map((image, idx) => (
              <div
                className="min-w-64 md:min-w-80 lg:min-w-96 aspect-[3/4] snap-start"
                key={idx}
              >
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt=""
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full space-y-4">
          <h2 className="text-2xl font-bold leading-7 uppercase">{name}</h2>
          <div className="flex items-center gap-0.5">
            <Stars rating={rating} />
            <span className="text-[14px]">{rating}/</span>
            <span className="text-[14px] text-black/60">5</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              ${discount > 0 ? price - (price * discount) / 100 : price}
            </span>
            {discount > 0 && (
              <>
                <span className="text-2xl font-bold text-black/30 line-through mx-2.5">
                  ${price}
                </span>
                <span className="w-12 text-[#FF3333] text-[14px] bg-red-100 p-1 px-2 rounded-2xl">
                  -{discount}%
                </span>
              </>
            )}
          </div>
          <p className="max-w-[500px] text-[14px] text-black/60 leading-5">
            {description}
          </p>

          <div className="w-full h-[1px] bg-black/15" />

          <h3 className="text-[12px] text-black/60">Select Color</h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                className="flex justify-center items-center size-10 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
                key={color}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Check className="text-white font-bold" />
                )}
              </button>
            ))}
          </div>

          <div className="w-full h-[1px] bg-black/15" />

          <h3 className="text-[12px] text-black/60">Select Size</h3>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                className={`w-fit px-4 py-1 rounded-2xl text-black/60 bg-[#F0F0F0] hover:bg-black hover:text-white cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                } transition-colors`}
                key={size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="w-full h-[1px] bg-black/15" />

          <div className="flex gap-2.5">
            <div className="flex">
              <button
                disabled={quantity === 1}
                className="flex justify-center items-center w-10 h-8 rounded-l-2xl bg-gray-200 cursor-pointer hover:bg-black/40"
                onClick={() => setQuantity(quantity - 1)}
              >
                <Minus size={18} />
              </button>
              <span className="block size-8 leading-7 text-center bg-gray-200">
                {quantity}
              </span>
              <button
                className="flex justify-center items-center w-10 h-8 rounded-r-2xl bg-gray-200 cursor-pointer hover:bg-black/40"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={18} />
              </button>
            </div>
            <button className="flex-auto max-w-96 h-8 rounded-2xl bg-black text-white cursor-pointer hover:bg-black/90 transition-colors">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
