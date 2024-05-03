import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../axios/baseUrl.js";
import { useEffect, useState } from "react";
import Divider from "../components/ui/Divider.jsx"

const OrderDetail = () => {
    const { id } = useParams();

    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});

    const fetchOrder = async () => {
        const orderResponse = await baseUrl.get(`/orders/${id}`);
        console.log(orderResponse.data);
        setOrder(orderResponse.data);

        const userResponse = await baseUrl.get(`/users/${orderResponse.data.userId}`);
        setUser(userResponse.data);
    }


    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            <div className="p-10 max-w-4xl mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold">Order ID | {order._id}</h1>
                    <h2 className="mt-2 text-gray-500 text-lg">Order Amount: ₹{order.totalPrice}</h2>
                    <h2 className="mt-2 text-gray-500 text-lg">Date: {new Date(order.createdAt).toLocaleString()}</h2>
                </div>
                <Divider />
                <div className="grid grid-cols-2 justify-items-center">
                        <Link to={`/product-detail/${order.productId._id}`} key={order.productId._id}>
                            <div className="mt-2 bg-gray-50 border p-4 rounded-md flex items-start space-x-4">
                                <img src={order.productId.image} alt={order.productId.title} className="h-32 w-32 object-cover" />
                                <div>
                                    <h2 className="text-xl font-semibold">{order.productId.title}</h2>
                                    <p className="text-md text-gray-500">Price: ₹{order.productId.price}</p>
                                </div>
                            </div>
                        </Link>
                </div>
                <Divider />
                <div>
                    <h2 className="text-gray-500 text-lg font-semibold">Ordered By: {user.email}</h2>
                </div>
            </div>
        </>
    )
}

export { OrderDetail };
