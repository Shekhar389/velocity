import { useEffect } from "react";
import { baseUrl } from "../../../axios/baseUrl.js";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ orders, setOrders }) => {

    const navigate = useNavigate();

    const fetchOrders = async () => {
        const res = await baseUrl.get(`/orders`);
        setOrders(res.data);
    }

    const changeOrderStatus = async (orderId) => {
        await baseUrl.put(`/orders/${orderId}`);
        await fetchOrders();
    }

    const checkOrderDetails = async (orderId) => {
        navigate(`/orders/${orderId}`)

    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <main>
            <div className="px-12">
                <table className="table table-zebra table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Total Amount</th>
                            <th>Timestamp</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr key={order._id}>
                                    <td>
                                        {order._id}
                                    </td>
                                    <td>
                                        {`₹${order.totalPrice}`}
                                    </td>
                                    <td>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </td>
                                    <td>
                                        {order.isDelivered ? "Shipped" : "Not Shipped"}
                                    </td>
                                    <td>
                                        <button onClick={() => changeOrderStatus(order._id)} className="btn btn-outline btn-primary btn-sm">Change Status</button>
                                    </td>
                                    <td>
                                        <button onClick={() => checkOrderDetails(order._id)} className="btn btn-outline btn-info btn-sm">Check Details</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* <Pagination/> */}

        </main>
    )
}

export default OrderTable;
