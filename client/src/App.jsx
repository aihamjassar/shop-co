import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "./components/common/ScrollToTop";

const Layout = lazy(() =>
  import("./pages/Layout").then((module) => ({ default: module.Layout }))
);
const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const ProductsPage = lazy(() =>
  import("./pages/ProductsPage").then((module) => ({
    default: module.ProductsPage,
  }))
);
const ProductDetailsPage = lazy(() =>
  import("./pages/ProductDetailsPage").then((module) => ({
    default: module.ProductDetailsPage,
  }))
);
const CartPage = lazy(() =>
  import("./pages/CartPage").then((module) => ({
    default: module.CartPage,
  }))
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="details/:id" element={<ProductDetailsPage />} />
            <Route path="cart/:id" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
