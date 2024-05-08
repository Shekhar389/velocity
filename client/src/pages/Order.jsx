import { useEffect, useState } from "react";
import { baseUrl } from "../axios/baseUrl.js";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const checkOrderDetails = async (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const fetchOrders = async () => {
    const res = await baseUrl.get(`/orders/ordersByUser`);
    console.log("res.data: ", res.data);
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main>
      {/* {
                orders.length === 0 ?
                    (
                        <div classNameName="hero bg-base-100 min-h-[70vh]">
                            <div classNameName="hero-content text-center">
                                <div classNameName="max-w-lg">
                                    <h1 classNameName="mb-5 text-5xl">
                                        No Orders Yet
                                    </h1>
                                    <Link to={"/products"}>
                                        <button classNameName="btn btn-lg mt-4 btn-outline">Go Shopping</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 classNameName="text-xl pl-16 font-bold mt-10 mb-5">Orders</h1>
                            </div>

                            <div classNameName="px-12">
                                <table classNameName="table table-zebra table-lg">
            
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                
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
                                                            classNameName="btn btn-outline btn-info btn-sm">Check
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
            } */}

      {orders.map((order) => (
        <article className="max-w-[85vh] rounded-xl border-2 border-red-300 bg-blue mx-auto p-3 my-3 ">
          <div className="flex items-center justify-center gap-4 p-4 sm:p-6 lg:p-8">
            <a href="#" className="block shrink-0">
              <img
                alt=""
                src={order.productId.image}
                className="h-56 w-56 size-14 rounded-lg object-cover"
              />
            </a>

            <div>
              <h3 className="font-medium sm:text-lg">
                <a href="#" className="hover:underline">
                  {" "}
                  {order.productId.title}
                </a>
              </h3>

              <p className="line-clamp-2 text-sm text-white">
                {order.productId.description}
              </p>

              <div className="mt-6 flex items-end justify-end sm:flex sm:items-center sm:gap-2 ">
                <button className="bg-teal-900 text-white rounded-2xl p-4">Download Game</button>
              </div>
            </div>
          </div>

        </article>
      ))}
    </main>
  );
};
export default Order;
