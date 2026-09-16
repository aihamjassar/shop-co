import { Check, ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useSearchParams } from "react-router-dom";
import { categories, colors, dressStyles, sizes } from "../constants/constants";

const MIN = 0;
const MAX = 500;
const STEP = 1;

const FilterSection = ({ title, open, onToggle, children }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between"
        aria-expanded={open}
      >
        <span className="text-[20px] font-semibold">{title}</span>

        {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {open && <div className="py-5">{children}</div>}
    </div>
  );
};

const RoundCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="group flex cursor-pointer items-center justify-between">
      <span
        className={`text-[14px] transition-colors ${
          checked
            ? "font-medium text-black"
            : "text-black/60 group-hover:text-black"
        }`}
      >
        {label}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      <span
        className={`flex size-5 items-center justify-center rounded-full border transition-colors ${
          checked
            ? "border-black bg-black"
            : "border-black/20 group-hover:border-black/50"
        }`}
      >
        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
      </span>
    </label>
  );
};

export const Filter = ({ setFilterIsOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  /*
   * Initialize the filter from the URL.
   * This means refreshing the page keeps the selected filters.
   */
  const getArrayParam = (key) => {
    const value = searchParams.get(key);

    return value ? value.split(",") : [];
  };

  const [openSections, setOpenSections] = useState({
    categories: true,
    colors: true,
    sizes: true,
    dressStyles: true,
    priceRange: true,
  });

  const [selectedCategories, setSelectedCategories] = useState(() =>
    getArrayParam("categories"),
  );

  const [selectedColors, setSelectedColors] = useState(() =>
    getArrayParam("colors"),
  );

  const [selectedSizes, setSelectedSizes] = useState(() =>
    getArrayParam("sizes"),
  );

  const [selectedDressStyles, setSelectedDressStyles] = useState(() =>
    getArrayParam("dressStyles"),
  );

  const [priceRange, setPriceRange] = useState(() => [
    Number(searchParams.get("minPrice")) || MIN,
    Number(searchParams.get("maxPrice")) || MAX,
  ]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleItem = (value, setItems) => {
    setItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  /*
   * Apply all filters to the URL.
   */
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    /*
     * Category
     */
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    /*
     * Colors
     */
    if (selectedColors.length > 0) {
      params.set("colors", selectedColors.join(","));
    } else {
      params.delete("colors");
    }

    /*
     * Sizes
     */
    if (selectedSizes.length > 0) {
      params.set("sizes", selectedSizes.join(","));
    } else {
      params.delete("sizes");
    }

    /*
     * Dress styles
     */
    if (selectedDressStyles.length > 0) {
      params.set("dressStyles", selectedDressStyles.join(","));
    } else {
      params.delete("dressStyles");
    }

    /*
     * Price
     */
    if (priceRange[0] > MIN) {
      params.set("minPrice", String(priceRange[0]));
    } else {
      params.delete("minPrice");
    }

    if (priceRange[1] < MAX) {
      params.set("maxPrice", String(priceRange[1]));
    } else {
      params.delete("maxPrice");
    }

    /*
     * Always start from page 1 after applying filters.
     */
    params.set("page", "1");

    setSearchParams(params);

    /*
     * Close mobile filter after applying.
     */
    setFilterIsOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedDressStyles([]);
    setPriceRange([MIN, MAX]);

    const params = new URLSearchParams();

    /*
     * Keep search and sorting when clearing filters.
     */
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");

    if (search) {
      params.set("search", search);
    }

    if (sortBy) {
      params.set("sortBy", sortBy);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <div className="h-fit space-y-5 rounded-md border border-black/10 p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold">Filter</h3>

        <button
          type="button"
          className="cursor-pointer rounded p-1 hover:bg-black/5 lg:hidden"
          onClick={() => setFilterIsOpen(false)}
          aria-label="Close filter"
        >
          <X />
        </button>
      </div>

      <div className="h-px w-full bg-black/15" />

      {/* Category */}
      <FilterSection
        title="Categories"
        open={openSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <RoundCheckbox
              key={category}
              label={category}
              checked={selectedCategories.includes(category)}
              onChange={() => toggleItem(category, setSelectedCategories)}
            />
          ))}
        </div>
      </FilterSection>

      <div className="h-px w-full bg-black/15" />

      {/* Dress Style */}
      <FilterSection
        title="Dress Styles"
        open={openSections.dressStyles}
        onToggle={() => toggleSection("dressStyles")}
      >
        <div className="space-y-3">
          {dressStyles.map(({ name: style }) => (
            <RoundCheckbox
              key={style}
              label={style}
              checked={selectedDressStyles.includes(style)}
              onChange={() => toggleItem(style, setSelectedDressStyles)}
            />
          ))}
        </div>
      </FilterSection>

      <div className="h-px w-full bg-black/15" />

      {/* Colors */}
      <FilterSection
        title="Colors"
        open={openSections.colors}
        onToggle={() => toggleSection("colors")}
      >
        <div className="flex flex-wrap justify-between gap-2.5">
          {colors.map((color) => {
            const selected = selectedColors.includes(color);

            const isLightColor = color === "#FFFFFF" || color === "#F5DD06";

            return (
              <button
                type="button"
                key={color}
                onClick={() => toggleItem(color, setSelectedColors)}
                className={`relative size-10 cursor-pointer rounded-full border border-black/10 transition-all ${
                  selected
                    ? "ring-2 ring-black ring-offset-2"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: color,
                }}
                aria-label={`Select color ${color}`}
                aria-pressed={selected}
              >
                {selected && (
                  <Check
                    size={18}
                    strokeWidth={3}
                    className={`absolute inset-0 m-auto ${
                      isLightColor ? "text-black" : "text-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <div className="h-px w-full bg-black/15" />

      {/* Size */}
      <FilterSection
        title="Sizes"
        open={openSections.sizes}
        onToggle={() => toggleSection("sizes")}
      >
        <div className="flex flex-wrap gap-2.5">
          {sizes.map((size) => {
            const selected = selectedSizes.includes(size);

            return (
              <button
                type="button"
                key={size}
                onClick={() => toggleItem(size, setSelectedSizes)}
                className={`w-fit cursor-pointer rounded-2xl border px-3 py-1.5 transition-colors duration-300 ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-black/5 hover:bg-black hover:text-white"
                }`}
                aria-pressed={selected}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <div className="h-px w-full bg-black/15" />

      {/* Price */}
      <FilterSection
        title="Price Range"
        open={openSections.priceRange}
        onToggle={() => toggleSection("priceRange")}
      >
        <div className="px-2.5 pb-8 pt-5">
          <Range
            values={priceRange}
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={setPriceRange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-1 w-full rounded-full"
                style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: priceRange,
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
              <div
                {...props}
                className="relative size-4 cursor-grab rounded-full bg-black shadow"
              >
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-black">
                  ${priceRange[index]}
                </span>
              </div>
            )}
          />
        </div>
      </FilterSection>

      {/* Actions */}
      <div className="space-y-3 pt-5">
        <button
          type="button"
          onClick={applyFilters}
          className="w-full cursor-pointer rounded-3xl bg-black p-3 text-white transition-colors hover:bg-black/85"
        >
          Apply Filter
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="w-full cursor-pointer rounded-3xl border border-black/10 p-3 transition-colors hover:bg-black/5"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};
