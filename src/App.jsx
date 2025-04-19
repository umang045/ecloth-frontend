import React, { lazy, useEffect, useState, Suspense, Component, useTransition } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { isLogin } from "./utils/AxiosConfig";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { SingleProduct } from "./Pages/SingleProduct/SingleProduct";
import MainSellerLayout from "./Components/MainSellerLayout/MainSellerLayout";
import MainAdminLayout from "./Components/MainAdminLayout/MainAdminLayout";
import ResetPass from "./Pages/ResetPass/ResetPass";
import { ImCross } from "react-icons/im";

// Lazy-loaded components
const Register = lazy(() => import("./Pages/Register/Register"));
const MyOrder = lazy(() => import("./Pages/MyOrder/MyOrder"));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));
const AboutUs = lazy(() => import("./Pages/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Products = lazy(() => import("./Pages/Products/Products"));
const Login = lazy(() => import("./Pages/Login/Login"));
const SellerAddProduct = lazy(() =>
  import("./Pages/Seller/SellerAddProduct/SellerAddProduct")
);
const SellerProductList = lazy(() =>
  import("./Pages/Seller/SellerProductList/SellerProductList")
);
const SellerOrderList = lazy(() =>
  import("./Pages/Seller/SellerOrderList/SellerOrderList")
);
const SellerSingleOrder = lazy(() =>
  import("./Pages/Seller/SellersSingleOrder/SellerSingleOrder")
);
const SellerProductTransaction = lazy(() =>
  import("./Pages/Seller/SellerProductTransaction/SellerProdTran")
);
const SellerHomePage = lazy(() =>
  import("./Pages/Seller/SellerHomePage/SellerHomePage")
);
const AdminUserList = lazy(() =>
  import("./Pages/Admin/AdminUserList/AdminUserList")
);
const AdminSellerList = lazy(() =>
  import("./Pages/Admin/AdminSellerList/AdminSellerList")
);
const AdminHomePage = lazy(() =>
  import("./Pages/Admin/AdminHomePage/AdminHomePage")
);
const AdminProductList = lazy(() =>
  import("./Pages/Admin/AdminProductList/AdminProductList")
);
const AdminOrderList = lazy(() =>
  import("./Pages/Admin/AdminOrderList/AdminOrderPage")
);

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again.</h1>;
    }
    return this.props.children;
  }
}

// Custom Link Component with startTransition
function Link({ to, children, ...props }) {
  const [, startTransition] = useTransition();

  return (
    <RouterLink
      to={to}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          window.history.pushState({}, '', to);
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
      }}
      {...props}
    >
      {children}
    </RouterLink>
  );
}

const App = () => {
  const [role, setRole] = useState("admin");
  const [isBotOpen, setIsBotOpen] = useState(false);

  // Check login status
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Navbar Link={Link} /> {/* Pass custom Link to Navbar */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={isLogin() ? <Home /> : <Login />} />
              <Route
                path="/register"
                element={isLogin() ? <Home /> : <Register />}
              />
              <Route path="/resetPassword/:token" element={<ResetPass />} />
              <Route path="/products" element={<Products />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route
                path="/cart"
                element={<ProtectedRoute element={<Cart />} />}
              />
              <Route
                path="/checkout"
                element={<ProtectedRoute element={<Checkout />} />}
              />
              <Route
                path="/orders"
                element={<ProtectedRoute element={<MyOrder />} />}
              />
              <Route
                path="/seller"
                element={
                  <ProtectedRoute
                    element={<MainSellerLayout />}
                    requiredRole="seller"
                  />
                }
              >
                <Route path="" element={<SellerHomePage />} />
                <Route path="addProduct" element={<SellerAddProduct />} />
                <Route path="sellerProductList" element={<SellerProductList />} />
                <Route
                  path="sellerProductList/:product_id"
                  element={<SellerAddProduct />}
                />
                <Route
                  path="sellerProductList/transaction/:product_id"
                  element={<SellerProductTransaction />}
                />
                <Route path="sellerOrderList" element={<SellerOrderList />} />
                <Route
                  path="sellerOrderList/:order_id"
                  element={<SellerSingleOrder />}
                />
              </Route>
              <Route
                path="/superadmin"
                element={
                  <ProtectedRoute
                    element={<MainAdminLayout />}
                    requiredRole="superadmin"
                  />
                }
              >
                <Route path="" element={<AdminHomePage />} />
                <Route path="adminUserList" element={<AdminUserList />} />
                <Route path="adminSellerList" element={<AdminSellerList />} />
                <Route path="adminOrderList" element={<AdminOrderList />} />
                <Route path="adminProductList" element={<AdminProductList />} />
                <Route
                  path="adminProductList/transaction/:product_id"
                  element={<SellerProductTransaction />}
                />
                <Route
                  path="adminOrderList/:order_id"
                  element={<SellerSingleOrder />}
                />
              </Route>
            </Routes>
          </Suspense>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
      <div className="fixed flex flex-col cursor-pointer items-center justify-center bottom-6 right-5 z-50">
        Chat Bot
        {isBotOpen ? (
          <ImCross
            size={50}
            color="red"
            onClick={() => {
              setIsBotOpen(!isBotOpen);
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <div
        className="fixed bottom-20 right-4 z-50"
        style={{ display: isBotOpen ? "block" : "none" }}
      >
        {/* Chatbot commented out */}
      </div>
    </>
  );
};

export default App;