import { useEffect, useState } from "react";
import { baseUrl } from "../axios/baseUrl.js";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const checkOrderDetails = async (orderId) => {
        navigate(`/orders/${orderId}`)

    }

    const fetchOrders = async () => {
        const res = await baseUrl.get(`/orders/ordersByUser`);
        setOrders(res.data);
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    return (
        <main>
            {
                orders.length === 0 ?
                    (
                        <div className="hero bg-base-100 min-h-[70vh]">
                            <div className="hero-content text-center">
                                <div className="max-w-lg">
                                    <h1 className="mb-5 text-5xl">
                                        No Orders Yet
                                    </h1>
                                    <Link to={"/products"}>
                                        <button className="btn btn-lg mt-4 btn-outline">Go Shopping</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className="text-xl pl-16 font-bold mt-10 mb-5">Orders</h1>
                            </div>

                            <div className="px-12">
                                <table className="table table-zebra table-lg">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            {/* <th>Username</th> */}
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                            <th>Timestamp</th>
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
                                                        {order.isDelivered ? "Shipped" : "Not Shipped"}
                                                    </td>
                                                    <td>
                                                        {new Date(order.createdAt).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => checkOrderDetails(order._id)}
                                                            className="btn btn-outline btn-info btn-sm">Check
                                                            Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>


                                </table>
                            </div>
                        </>
                    )
            }

        </main>
    )
}

export default Order;
