import CartList from "../components/cart/CartList.jsx";
import { Link } from "react-router-dom";
import { useEffect, } from "react";
import { baseUrl } from "../axios/baseUrl.js";
import { setCart } from '../redux/features/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

    const dispatch = useDispatch();

    const fetchCartItems = async () => {
        try {
            const res = await baseUrl.get(`/carts`)
            const resData = {
                cartItems: res.data.cartItems,
                totalPrice: res.data.totalPrice,
                tax: res.data.tax,
                shipping: res.data.shipping
            }
            dispatch(setCart(resData));
        } catch (e) {
            console.log(e)
        }
    }

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        fetchCartItems();
    }, [])

    return (
        <>
            {
                cart.cartItems && cart.cartItems.length === 0 ?
                    <div className="hero bg-base-100 min-h-[70vh]">
                        <div className="hero-content text-center">
                            <div className="max-w-lg">
                                <h1 className="mb-5 text-5xl">
                                    Cart is empty
                                </h1>
                                <Link to={"/products"}>
                                    <button className="btn btn-lg mt-4 btn-outline">Go Shopping</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <section>
                        <div className="min-h-[70vh] bg-base-100 flex flex-col lg:flex-row place-content-evenly px-8">
                            <div className="flex-col max-w-lg w-full mx-auto px-8">
                                <div className="lg:fixed lg:h-[70vh] lg:w-[28vw] lg:overflow-y-scroll">

                                    <CartList />

                                </div>
                            </div>
                            <div className="flex-col content-center place-items-center max-w-lg w-full mx-auto px-8 py-8">
                                <div>

                                    <Link to={"/order-summary"}>
                                        <button className="btn btn-block mt-6 btn-outline btn-neutral">Proceed To COMPLETE</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>
    );
};

export default Cart;
