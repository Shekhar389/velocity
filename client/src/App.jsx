import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProductList from "./pages/ProductList.jsx"
import Home from "./pages/Home.jsx"
import Navbar from "./components/layout/Navbar.jsx"
import Footer from "./components/layout/Footer.jsx"
import Divider from "./components/ui/Divider.jsx"
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx"
import CreateProduct from "./components/admin_dashboard/products/CreateProduct.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Checkout from "./pages/Checkout.jsx";
import Order from "./pages/Order.jsx"
import OrderSummary from "./pages/OrderSummary.jsx"
import { AuthenticatedRoute } from "./utils/AuthenticatedRoute.jsx"
import { ResetPassword } from "./components/login/ResetPassword.jsx"
import { ForgotPassword } from "./components/login/ForgotPassword.jsx"
import { OrderSuccess } from "./pages/OrderSuccess.jsx";
import { OrderFail } from "./pages/OrderFail.jsx";
import UpdateProduct from "./components/admin_dashboard/products/UpdateProduct.jsx";
import { OrderDetail } from "./pages/OrderDetail.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Divider />

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product-detail/:productId" element={<ProductDetail />} />

                    <Route path="/cart" element={<AuthenticatedRoute><Cart /></AuthenticatedRoute>} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/reset" element={<ForgotPassword />} />
                    <Route path="/reset/:resetToken" element={<ResetPassword />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route path={"/order-success"} element={<AuthenticatedRoute><OrderSuccess /></AuthenticatedRoute>} />
                    <Route path={"/order-fail"} element={<AuthenticatedRoute><OrderFail /></AuthenticatedRoute>} />
                    <Route path="/checkout" element={<AuthenticatedRoute><Checkout /></AuthenticatedRoute>} />
                    <Route path="/order-summary" element={<AuthenticatedRoute><OrderSummary /></AuthenticatedRoute>} />
                    <Route path="/orders" element={<AuthenticatedRoute><Order /></AuthenticatedRoute>} />
                    <Route path="/orders/:id" element={<AuthenticatedRoute><OrderDetail /></AuthenticatedRoute>} />

                    <Route path="/admin-dashboard/:dashboard"
                        element={<AuthenticatedRoute><AdminDashboard /></AuthenticatedRoute>} />
                    <Route path="/admin-dashboard/products/create-product"
                        element={<AuthenticatedRoute><CreateProduct /></AuthenticatedRoute>} />

                    <Route path="/admin-dashboard/products/update-product/:productId"
                        element={<AuthenticatedRoute><UpdateProduct /></AuthenticatedRoute>} />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
