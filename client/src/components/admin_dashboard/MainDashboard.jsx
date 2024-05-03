import { useParams } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage.jsx";
import ProductDashboard from "./products/ProductDashboard.jsx";
import UserDashboard from "./users/UserDashboard.jsx";
import OrderDashboard from "./orders/OrderDashboard.jsx";

const MainDashboard = () => {
    const { dashboard } = useParams();

    return (
        <main>
            {dashboard === "products" ? <ProductDashboard />
                : dashboard === "users" ? <UserDashboard />
                    : dashboard === "orders" ? <OrderDashboard />
                        : <ErrorPage />}
        </main>

    )
}

export default MainDashboard;
