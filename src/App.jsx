import React, { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "./route/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy } from "react";
import AboutUs from "./route/AboutUs.jsx";
import ReviewSection from "./route/product-Detail/ReviewSection.jsx";
import ProductDesciption from "./route/product-Detail/ProductDescription.jsx";
// import TempTopUP from "./route/TempTopUP.jsx";
// Lazy loaded components
const ProductList = lazy(() => import("./route/ProductList.jsx"));
const Login = lazy(() => import("./component/Auth/Login/Login.jsx"));
const ShoppingCartTopUp = lazy(() => import("./route/shoppingCart/ShoppingCartTopUp.jsx"));
const Password = lazy(() => import("./component/Auth/Password.jsx"));
const GoogleAuth = lazy(() => import("./component/Auth/GoogleAuth.jsx"));
const ProductDetails = lazy(() => import("./route/product-Detail/ProductDetails.jsx"));
const ProductDetailsPopUp = lazy(() =>
  import("./route/product-Detail/ProductDetailsPopUp.jsx")
);
const ShoppingCart = lazy(() => import("./route/shoppingCart/ShoppingCart.jsx"));
const WishList = lazy(() => import("./route/wishlist/WishList.jsx"));
const CheckOut = lazy(() => import("./route/CheckOut.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./component/Auth/ForgotPassword/ForgotPasswordForm.jsx")
);
const NewRegister = lazy(() =>
  import("./component/Auth/Register/NewRegister.jsx")
);
const Profile = lazy(() => import("./route/Profile.jsx"));
const HomeSquareSection = lazy(() =>
  import("./component/home/HomeSquareSection.jsx")
);

import DeleteBtn from './component/home/DeleteBtn.jsx'
// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
      loadingg...
    </div>
  </div>
);
import axios from "axios";
axios.defaults.withCredentials = true;
export const GoogleBtn = ({ text }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
      <Suspense fallback={<LoadingFallback />}>
        <GoogleAuth text={text} />
      </Suspense>
    </GoogleOAuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="deletebtn" element={<DeleteBtn />} />
              <Route path="review" element={<ReviewSection />} />
              <Route path="description" element={<ProductDesciption />} />

              <Route
                path="productlist"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductList />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AboutUs />
                  </Suspense>
                }
              />
              <Route
                path="productdetails"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductDetails />
                  </Suspense>
                }
              />
              <Route
                path="productdetailspopup"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductDetailsPopUp />
                  </Suspense>
                }
              />
              <Route
                path="profile"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="checkout"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CheckOut />
                  </Suspense>
                }
              />
              <Route
                path="/shoppingcarttopup"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ShoppingCartTopUp />
                  </Suspense>
                }
              />
              <Route
                path="wishlist"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <WishList />
                  </Suspense>
                }
              />
             <Route
              path="shoppingcart"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <ShoppingCart />
                </Suspense>
              }
             />

      </Route>

      {/* Auth routes */}
      <Route
        path="forgotpasswordform"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ForgotPasswordForm />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NewRegister />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="password"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Password />
          </Suspense>
        }
      />

      {/* Shopping routes */}

    

      <Route
        path="ss"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <HomeSquareSection />
          </Suspense>
        }
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
