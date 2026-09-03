import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./store/thunks/authThunk";
import { DashboardLayout } from "./Layout/DashboardLayout";

const Layout = lazy(() =>
  import("./pages/Layout").then((module) => ({ default: module.Layout }))
);
const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const DashboardPage = lazy(() =>
  import("./pages/dashboard/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  }))
);
const OverviewPage = lazy(() =>
  import("./pages/dashboard/OverviewPage").then((module) => ({
    default: module.OverviewPage,
  }))
);
const AccountPage = lazy(() =>
  import("./pages/dashboard/AccountPage").then((module) => ({
    default: module.AccountPage,
  }))
);
const UsersPage = lazy(() =>
  import("./pages/dashboard/UsersPage").then((module) => ({
    default: module.UsersPage,
  }))
);
const ProductsDashboardPage = lazy(() =>
  import("./pages/dashboard/ProductsPage").then((module) => ({
    default: module.ProductsPage,
  }))
);
const OrdersPage = lazy(() =>
  import("./pages/dashboard/OrdersPage").then((module) => ({
    default: module.OrdersPage,
  }))
);
const ProductsPage = lazy(() =>
  import("./pages/ProductsPage").then((module) => ({
    default: module.ProductsPage,
  }))
);
const CreateProductPage = lazy(() =>
  import("./pages/dashboard/CreateProductPage").then((module) => ({
    default: module.CreateProductPage,
  }))
);
const UpdateProductPage = lazy(() =>
  import("./pages/dashboard/UpdateProductPage").then((module) => ({
    default: module.UpdateProductPage,
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
const ResetPasswordPage = lazy(() =>
  import("./pages/ResetPasswordPage").then((module) => ({
    default: module.ResetPasswordPage,
  }))
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  }))
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticate } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="details/:id" element={<ProductDetailsPage />} />
            <Route path="cart/:id" element={<CartPage />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              isAuthenticate && user.role === "admin" ? (
                <DashboardLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route path="overview" element={<OverviewPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsDashboardPage />} />
            <Route path="create-product" element={<CreateProductPage />} />
            <Route path="update-product/:id" element={<UpdateProductPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
