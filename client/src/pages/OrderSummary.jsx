import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const OrderSummary = () => {

    const cart = useSelector((state) => state.cart);

    const [a, seta] = useState({});

    return (
        <div onClick={() => seta(cart)}>

            <div className="flex-col max-w-lg w-full mx-auto px-8 py-8">
                <header className="text-center">
                    <h1 className='text-4xl mb-2'>Order Summary</h1>
                </header>

                <div className="mt-8 flex justify-between border-t border-gray-100 pt-8">
                    <div className="text-lg">SubTotal</div>
                    <div className="text-lg">₹{cart.totalPrice}</div>
                </div>

                <div className="mt-8 flex justify-between ">
                    <div className="text-lg">Shipping</div>
                    <div className="text-lg">₹{cart.shipping}</div>
                </div>

                <div className="mt-8 flex justify-between ">
                    <div className="text-lg">Tax</div>
                    <div className="text-lg">₹{cart.tax}</div>
                </div>

                <div className="mt-8 flex justify-between ">
                    <h2 className="text-xl font-semibold">Amount To Be Paid</h2>
                    <h2 className="text-xl font-semibold">₹{(Number(cart.tax)+Number(cart.shipping)+Number(cart.totalPrice)).toFixed(2)}</h2>
                </div>

                <div className="mt-8 flex justify-center ">
                    <Link to={"/checkout"}>
                        <button className="btn btn-lg mt-4 btn-outline">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;
