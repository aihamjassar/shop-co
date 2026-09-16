import { useState } from "react";
import { Stars } from "../common/Stars";
import { Check, Minus, Plus } from "lucide-react";
import { Slider } from "../common/Slider";
import { Link } from "react-router-dom";

const colorMap = {
  Black: "#111111",
  White: "#ffffff",
  Navy: "#1f2a44",
  "Sky Blue": "#93c5fd",
  Sand: "#d6c3a5",
  Charcoal: "#374151",
  Cream: "#f5f0e6",
  Olive: "#66704a",
  Burgundy: "#7f1d1d",
  Champagne: "#ead7b7",
  Stone: "#a8a29e",
  Mocha: "#8b6f5a",
  Sage: "#9caf88",
};

export const ProductDetailsSection = ({ product }) => {
  const name = product.title || product.name;
  const rating = product.ratingsAverage ?? product.rating ?? 0;
  const images = [product.imageCover, ...(product.images || [])].filter(
    Boolean,
  );
  const colors = product.colors?.length ? product.colors : ["Black"];
  const sizes = product.sizes?.length ? product.sizes : ["One size"];
  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = Math.max(1, product.quantity || 1);

  return (
    <div className="px-5 md:px-8 py-5 mb-16">
      <div className="text-black/60">
        <Link
          to={"/"}
          className="transition-colors duration-300 hover:text-blue-700"
        >
          Home
        </Link>{" "}
        &gt;{" "}
        <Link
          to={"/products"}
          className="transition-colors duration-300 hover:text-blue-700"
        >
          Products
        </Link>{" "}
        &gt; {name}
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <div className="md:max-w-80 lg:min-w-96">
          <Slider>
            {images.map((image) => (
              <div
                className="min-w-64 md:min-w-80 lg:min-w-96 aspect-[3/4] snap-start"
                key={image}
              >
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt={name}
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
            <span className="text-[14px] ml-1">{rating.toFixed(1)}/5</span>
            <span className="text-sm text-black/60">
              ({product.ratingsQuantity || 0} reviews)
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              ${(price - (price * discount) / 100).toFixed(2)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-2xl font-bold text-black/30 line-through mx-2.5">
                  ${price.toFixed(2)}
                </span>
                <span className="w-12 text-[#FF3333] text-[14px] bg-red-100 p-1 px-2 rounded-2xl">
                  -{discount}%
                </span>
              </>
            )}
          </div>
          <p className="max-w-[500px] text-[14px] text-black/60 leading-5">
            {product.description}
          </p>
          <div className="w-full h-px bg-black/15" />
          <h3 className="text-[12px] text-black/60">Select Color</h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                aria-label={`Select ${color}`}
                className="flex justify-center items-center size-10 rounded-full cursor-pointer border border-black/10"
                style={{ backgroundColor: colorMap[color] || color }}
                key={color}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Check
                    className={color === "White" ? "text-black" : "text-white"}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="w-full h-px bg-black/15" />
          <h3 className="text-[12px] text-black/60">Select Size</h3>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                className={`w-fit px-4 py-1 rounded-2xl text-black/60 bg-[#F0F0F0] hover:bg-black hover:text-white cursor-pointer ${selectedSize === size ? "bg-black text-white" : ""} transition-colors`}
                key={size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="w-full h-px bg-black/15" />
          <div className="flex gap-2.5">
            <div className="flex">
              <button
                disabled={quantity === 1}
                className="flex justify-center items-center w-10 h-8 rounded-l-2xl bg-gray-200 cursor-pointer hover:bg-black/40 disabled:opacity-40"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Minus size={18} />
              </button>
              <span className="block size-8 leading-7 text-center bg-gray-200">
                {quantity}
              </span>
              <button
                disabled={quantity >= maxQuantity}
                className="flex justify-center items-center w-10 h-8 rounded-r-2xl bg-gray-200 cursor-pointer hover:bg-black/40 disabled:opacity-40"
                onClick={() =>
                  setQuantity((value) => Math.min(maxQuantity, value + 1))
                }
              >
                <Plus size={18} />
              </button>
            </div>
            <button className="flex-auto max-w-96 h-8 rounded-2xl bg-black text-white cursor-pointer hover:bg-black/90 transition-colors">
              Add to cart
            </button>
          </div>
          <p className="text-xs text-black/50">
            {product.quantity > 0
              ? `${product.quantity} available`
              : "Out of stock"}
          </p>
        </div>
      </div>
    </div>
  );
};
