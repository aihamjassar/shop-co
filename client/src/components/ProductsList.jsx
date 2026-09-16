import {
  ArrowLeft,
  ArrowRight,
  Filter as FilterIcon,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ProductSlide } from "./common/ProductSlide";
import { getAllProducts } from "../store/thunks/productsThunk";

const PAGE_SIZE = 8;

const sortByOptions = [
  { label: "Sort by", value: "" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Top Rated", value: "rating-desc" },
  { label: "Low Rated", value: "rating-asc" },
  { label: "Top Selling", value: "selling-desc" },
  { label: "Newest", value: "newest" },
];

const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const ProductsList = ({ setFilterIsOpen }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, totalProducts, status, error } = useSelector(
    (state) => state.products,
  );
  
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const sortBy = searchParams.get("sortBy") || "";

  const pageNumber = Math.max(1, Number(searchParams.get("pageNumber")) || 1);

  // Fetch products whenever URL query parameters change
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    dispatch(
      getAllProducts({
        ...params,
        pageNumber,
        pageSize: PAGE_SIZE,
      }),
    );
  }, [dispatch, searchParams, pageNumber]);

  // Keep search input synchronized with the URL
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";

      if (search === currentSearch) return;

      const params = new URLSearchParams(searchParams);

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      params.set("pageNumber", "1");

      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, searchParams, setSearchParams]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages || page === pageNumber) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set("pageNumber", String(page));

    setSearchParams(params);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }

    params.set("pageNumber", "1");

    setSearchParams(params);
  };

  const handleRetry = () => {
    const params = Object.fromEntries(searchParams.entries());

    dispatch(
      getAllProducts({
        ...params,
        pageNumber,
        pageSize: PAGE_SIZE,
      }),
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">All Products</h2>

          <p className="mt-1 text-sm text-black/60">
            {totalProducts} styles ready to ship
          </p>
        </div>

        <button
          className="flex w-fit items-center gap-2 rounded-md bg-black/5 p-2 hover:bg-black/15 lg:hidden"
          onClick={() => setFilterIsOpen((prevState) => !prevState)}
          aria-label="Open filters"
        >
          <FilterIcon size={18} />
          Filter
        </button>
      </div>

      {/* Search & Sort */}
      <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-black/[0.03] p-3 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2">
          <Search size={18} className="text-black/50" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search products..."
            aria-label="Search products"
          />
        </label>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="rounded-xl bg-white px-3 py-2 text-sm outline-none"
          aria-label="Sort products"
        >
          {sortByOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div className="grid grid-cols-2 gap-5 py-8 md:grid-cols-3 xl:grid-cols-4">
          <p className="col-span-full py-16 text-center text-black/60">
            Loading the latest collection...
          </p>
        </div>
      )}

      {/* Error */}
      {status === "failed" && (
        <div className="py-16 text-center">
          <p className="text-red-600">{error || "Unable to load products."}</p>

          <button
            onClick={handleRetry}
            className="mt-4 rounded-full bg-black px-5 py-2 text-white"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {status !== "loading" && status !== "failed" && products.length === 0 && (
        <div className="py-16 text-center text-black/60">
          No products match those filters.
        </div>
      )}

      {/* Products */}
      {status !== "loading" && status !== "failed" && products.length > 0 && (
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 py-8 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductSlide key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <>
          <div className="my-4 h-px w-full bg-black/15" />

          <div className="flex items-center justify-center gap-1">
            {/* Previous */}
            <button
              disabled={pageNumber === 1}
              onClick={() => changePage(pageNumber - 1)}
              className="flex size-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Page numbers */}
            {getPaginationItems(pageNumber, totalPages).map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex size-10 items-center justify-center text-black/50"
                  >
                    ...
                  </span>
                );
              }

              const isActive = item === pageNumber;

              return (
                <button
                  key={item}
                  onClick={() => changePage(item)}
                  className={`flex size-10 items-center justify-center rounded-full text-sm transition-colors ${
                    isActive ? "bg-black text-white" : "hover:bg-black/10"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Go to page ${item}`}
                >
                  {item}
                </button>
              );
            })}

            {/* Next */}
            <button
              disabled={pageNumber === totalPages}
              onClick={() => changePage(pageNumber + 1)}
              className="flex size-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
