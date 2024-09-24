import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";
import { Provider } from "jotai";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { UnreadProvider } from "./context/UnreadContext";
import { ConfigProvider } from './context/ConfigContext';
import CircularIndeterminate from "./components/CircularIndeterminate";
import { HelmetProvider } from "react-helmet-async";

// Lazy load components
const App = React.lazy(() => import("./App"));
const Home = React.lazy(() => import("./components/Home"));
const Pay = React.lazy(() => import("./components/Pay"));
const Categories = React.lazy(() => import("./components/Categories"));
const CategoriesMobile = React.lazy(() => import("./components/CategoriesMobile"));
const Profile = React.lazy(() => import("./components/Profile"));
const Cart = React.lazy(() => import("./components/Cart"));
const ProductDetails = React.lazy(() => import("./components/ProductDetails"));
const Subcategory = React.lazy(() => import("./components/Subcategory"));
const CategorySubcategories = React.lazy(() => import("./components/CategorySubcategories"));
const SearchResults = React.lazy(() => import("./components/SearchResults"));
const SearchBar = React.lazy(() => import("./components/SearchBar"));
const CategoryProducts = React.lazy(() => import("./components/CategoryProducts"));
const DiscountProducts = React.lazy(() => import("./components/DiscountProducts"));
const DiscountedProductsPage = React.lazy(() => import("./components/DiscountedProductsPage"));
const NoMatch = React.lazy(() => import("./components/NoMatch"));
const Layout = React.lazy(() => import("./components/Layout"));
const Protected = React.lazy(() => import("./components/Protected"));
const DiscountProductsByCategoryAndPorcentage = React.lazy(() => import("./components/DiscountProductsByCategoryAndPorcentage"));
const Heart = React.lazy(() => import("./components/Heart"));
const LoginForm = React.lazy(() => import("./components/LoginForm"));
const RegisterLink = React.lazy(() => import("./components/RegisterLink"));
const Register = React.lazy(() => import("./components/Register"));
const PasswordResetRequest = React.lazy(() => import("./components/PasswordResetRequest"));
const ResetPasswordPage = React.lazy(() => import("./components/ResetPasswordPage"));
const NewArrivals = React.lazy(() => import("./components/NewArrivals"));
const SignUpForm = React.lazy(() => import("./components/SignUpForm"));
const MyOrders = React.lazy(() => import("./components/MyOrders"));
const OrderDetails = React.lazy(() => import("./components/OrderDetails"));
const AllOrderDetails = React.lazy(() => import("./components/AllOrderDetails"));
const MobileProfile = React.lazy(() => import("./components/MobileProfile"));
const helmetContext = {};
const Root = () => (
  <Suspense fallback={<div style={{
    display:"flex",
    justifyContent:"center",
    marginTop:"15rem"

  }}>
    <CircularIndeterminate />
    </div>}>
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/" element={<Home />} />
      <Route path="/categorias" element={<Categories />} />
      <Route path="/categoriasMobile" element={<CategoriesMobile />} />
      <Route path="/favoritos" element={<Heart />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/conta" element={<MobileProfile />} />
      <Route path="/products/:name/:productId" element={<ProductDetails />} />
      <Route path="/payment/:quantity/:shippingFee/:totalPrice" element={<Pay />} />
      <Route path="/categories/:category" element={<CategorySubcategories />} />
      <Route path="/categories/:category/:subcategory" element={<Subcategory />} />
      <Route path="/search/product/:query" element={<SearchResults />} />
      <Route path="/search" element={<SearchBar />} />
      <Route path="/categories/:category/subcategories" element={<CategorySubcategories />} />
      <Route path="/categories/:category/:subcategory/products" element={<CategoryProducts />} />
      <Route path="/productsByDiscountPercentage/:discount" element={<DiscountProducts />} />
      <Route path="/produtos/vestidos" element={<DiscountedProductsPage />} />
      <Route path="/products/discount/:discount/category/:category" element={<DiscountProductsByCategoryAndPorcentage />} />
      <Route path="*" element={<NoMatch />} />
      <Route path="/protected" element={<Protected />} />
      <Route path="/layout" element={<Layout />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterLink />} />
      {/* <Route path="/success" element={<SuccessPage />} /> */}
      <Route path="/register/:token" element={<Register />} />
      <Route path="/forgotPassword" element={<PasswordResetRequest />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/newArrivals" element={<NewArrivals />} />
      <Route path="/signUp" element={<SignUpForm />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/boleto/:id/:customerId" element={<OrderDetails />} />
      <Route path="/order/:custumerId/:id" element={<AllOrderDetails />} />
    </Routes>
  </Suspense>
);

createRoot(document.getElementById("root")).render(
  <HelmetProvider  context={helmetContext}>

  <ConfigProvider>
    <AuthProvider>
      <UnreadProvider>
        <CartProvider>
          <FavoritesProvider>
            <React.StrictMode>
              <BrowserRouter>
                <ErrorBoundary>
                  <Provider>
                    <Root />
                  </Provider>
                </ErrorBoundary>
              </BrowserRouter>
            </React.StrictMode>
          </FavoritesProvider>
        </CartProvider>
      </UnreadProvider>
    </AuthProvider>
  </ConfigProvider>
  </HelmetProvider>
);
