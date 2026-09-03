import { ArrowLeft, ArrowRight, Filter as FilterIcon, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductSlide } from "./common/ProductSlide";
import { getAllProducts } from "../store/thunks/productsThunk";

const PAGE_SIZE = 8;
const categories = ["All", "Men", "Women", "Unisex"];
const styles = ["All", "Casual", "Formal", "Gym", "Party"];

export const ProductsList = ({ setFilterIsOpen }) => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [style, setStyle] = useState("All");

  useEffect(() => {
    if (status === "idle") dispatch(getAllProducts());
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const title = (product.title || "").toLowerCase();
      const matchesSearch = !query || title.includes(query) || (product.subcategory || "").toLowerCase().includes(query);
      const matchesCategory = category === "All" || product.category === category;
      const matchesStyle = style === "All" || product.style === style;
      return matchesSearch && matchesCategory && matchesStyle;
    });
  }, [products, search, category, style]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const visibleProducts = filteredProducts.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);

  useEffect(() => {
    setPageNumber(1);
  }, [search, category, style]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">All Products</h2>
          <p className="mt-1 text-sm text-black/60">{filteredProducts.length} styles ready to ship</p>
        </div>
        <button
          className="flex w-fit items-center gap-2 rounded-md bg-black/5 p-2 hover:bg-black/15 lg:hidden"
          onClick={() => setFilterIsOpen((preState) => !preState)}
          aria-label="Open filters"
        >
          <FilterIcon size={18} /> Filter
        </button>
      </div>

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
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl bg-white px-3 py-2 text-sm outline-none">
          {categories.map((item) => <option key={item} value={item}>{item} category</option>)}
        </select>
        <select value={style} onChange={(event) => setStyle(event.target.value)} className="rounded-xl bg-white px-3 py-2 text-sm outline-none">
          {styles.map((item) => <option key={item} value={item}>{item} style</option>)}
        </select>
      </div>

      {status === "loading" && <div className="grid grid-cols-2 gap-5 py-8 md:grid-cols-3 xl:grid-cols-4"><p className="col-span-full py-16 text-center text-black/60">Loading the latest collection...</p></div>}
      {status === "failed" && <div className="py-16 text-center"><p className="text-red-600">{error || "Unable to load products."}</p><button onClick={() => dispatch(getAllProducts())} className="mt-4 rounded-full bg-black px-5 py-2 text-white">Try again</button></div>}
      {status !== "loading" && status !== "failed" && visibleProducts.length === 0 && <div className="py-16 text-center text-black/60">No products match those filters.</div>}
      {status !== "loading" && status !== "failed" && visibleProducts.length > 0 && <div className="grid grid-cols-2 gap-x-5 gap-y-8 py-8 md:grid-cols-3 xl:grid-cols-4">{visibleProducts.map((product) => <ProductSlide key={product._id} product={product} />)}</div>}

      <div className="my-4 h-px w-full bg-black/15" />
      <div className="flex items-center gap-3">
        <button disabled={pageNumber === 1} onClick={() => setPageNumber((page) => Math.max(1, page - 1))} className="mr-auto flex items-center gap-1.5 rounded-md border border-black/10 p-2 shadow-sm transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={18} /> Previous</button>
        <span className="text-sm text-black/60">Page {pageNumber} of {totalPages}</span>
        <button disabled={pageNumber === totalPages} onClick={() => setPageNumber((page) => Math.min(totalPages, page + 1))} className="ml-auto flex items-center gap-1.5 rounded-md border border-black/10 p-2 shadow-sm transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Next <ArrowRight size={18} /></button>
      </div>
    </div>
  );
};
