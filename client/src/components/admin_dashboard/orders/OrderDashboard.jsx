import OrderTable from "./OrderTable.jsx";
import OrderDashboardNavbar from "./OrderDashboardNavbar.jsx";
import Divider from "../../ui/Divider.jsx";
import { useState } from "react";

const OrderDashboard = () => {

    const [orders, setOrders] = useState([]);

    return (
        <main>
            <OrderDashboardNavbar setOrders={setOrders} />
            <Divider />
            <OrderTable orders={orders} setOrders={setOrders} />
        </main>
    )
}

export default OrderDashboard;
