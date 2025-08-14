import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const colors = [
  "#00C12B",
  "#F50606",
  "#F5DD06",
  "#F57906",
  "#06CAF5",
  "#063AF5",
  "#7D06F5",
  "#F506A4",
  "#FFFFFF",
  "#000000",
];
const sizes = [
  "Small",
  "XX-Small",
  "X-Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4XLarge",
];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];
const MIN = 0;
const MAX = 500;
const STEP = 1;
export const Filter = ({ setFilterIsOpen }) => {
  const [openColors, setOpenColors] = useState(true);
  const [openSize, setOpenSize] = useState(true);
  const [openDressStyle, setOpenDressStyle] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [values, setValues] = useState([50, 200]);

  return (
    <div className="p-3 border border-black/10 rounded-md space-y-5 h-fit">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold">Filter</h3>
        <button
          className="hover:bg-black/5 cursor-pointer p-1 rounded lg:hidden"
          onClick={() => setFilterIsOpen(false)}
        >
          <X />
        </button>
      </div>
      <div className="w-full h-[1px] bg-black/15" />
      <div className="space-y-3 py-2">
        <button className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-[14px] text-black/60">T-shirts</span>
          {<ChevronRight size={20} className="text-black/60" />}
        </button>
        <button className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-[14px] text-black/60">Shorts</span>
          {<ChevronRight size={20} className="text-black/60" />}
        </button>
        <button className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-[14px] text-black/60">Shirts</span>
          {<ChevronRight size={20} className="text-black/60" />}
        </button>
        <button className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-[14px] text-black/60">Hoodie</span>
          {<ChevronRight size={20} className="text-black/60" />}
        </button>
        <button className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-[14px] text-black/60">Jeans</span>
          {<ChevronRight size={20} className="text-black/60" />}
        </button>
      </div>
      <div className="w-full h-[1px] bg-black/15" />
      <div>
        <button
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={() => setOpenPrice(!openPrice)}
        >
          <span className="font-semibold text-[20px]">Price</span>
          {!openPrice ? <ChevronRight /> : <ChevronDown />}
        </button>
        {openPrice && (
          <div className="px-2.5 pb-10 pt-5">
            <Range
              values={values}
              min={MIN}
              step={STEP}
              max={MAX}
              onChange={(newValues) => setValues(newValues)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="w-full h-1 rounded bg-gray-300"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values,
                      colors: ["#ccc", "#000", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, index }) => (
                <div {...props} className="size-4 bg-black rounded-full shadow">
                  <div className="absolute -bottom-6 text-xs text-black font-semibold">
                    ${values[index]}
                  </div>
                </div>
              )}
            />
          </div>
        )}
      </div>
      <div className="w-full h-[1px] bg-black/15" />
      <div>
        <button
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={() => setOpenColors(!openColors)}
        >
          <span className="font-semibold text-[20px]">Colors</span>
          {openColors ? <ChevronDown /> : <ChevronRight />}
        </button>
        <div
          className={`flex flex-wrap justify-between gap-2.5 py-5 ${
            !openColors && "hidden"
          }`}
        >
          {colors.map((color) => (
            <button
              className="size-10 rounded-full border border-black/10 cursor-pointer"
              style={{ backgroundColor: color }}
              key={color}
            ></button>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-black/15" />
      <div>
        <button
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={() => setOpenSize(!openSize)}
        >
          <span className="font-semibold text-[20px]">Size</span>
          {openSize ? <ChevronDown /> : <ChevronRight />}
        </button>
        <div
          className={`flex flex-wrap gap-2.5 py-5 ${
            !openSize && "hidden"
          }`}
        >
          {sizes.map((size) => (
            <button
              className={`w-fit px-2 py-1 rounded-2xl bg-black/5 border border-black/10 cursor-pointer hover:bg-black hover:text-white transition-colors duration-300`}
              key={size}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-black/15" />
      <div>
        <button
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={() => setOpenDressStyle(!openDressStyle)}
        >
          <span className="text-[20px] font-semibold">Dress Style</span>
          {openDressStyle ? <ChevronDown /> : <ChevronRight />}
        </button>
        <div className={`space-y-3 py-5 ${!openDressStyle && "hidden"}`}>
          {dressStyles.map((style) => (
            <button
              className="w-full flex justify-between items-center cursor-pointer"
              key={style}
            >
              <span className="text-[14px] text-black/60">{style}</span>
              {<ChevronRight size={20} className="text-black/60" />}
            </button>
          ))}
        </div>
      </div>
      <button className="block w-10/12 mx-auto my-10 p-2 bg-black hover:bg-black/85 text-white rounded-3xl cursor-pointer">
        Apply Filter
      </button>
    </div>
  );
};
