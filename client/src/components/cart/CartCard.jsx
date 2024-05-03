import { useEffect, useState } from "react";
import { baseUrl } from "../../axios/baseUrl.js";
import { setCart } from "../../redux/features/cartSlice.js";
import { useDispatch } from "react-redux";


const CartCard = ({ cartItem }) => {

    const dispatch = useDispatch();
    const [product, setProduct] = useState({});

    const fetchProduct = async () => {
        const res = await baseUrl.get(`/products/${cartItem.productId}`)
        setProduct(res.data);
    }

    const deleteCartItem = async () => {
        try {
            await baseUrl.delete(`/carts/${cartItem.productId}`);

            const res2 = await baseUrl.get(`/carts`);

            const resData = {
                cartItems: res2.data.cartItems,
                totalPrice: res2.data.totalPrice,
                tax: res2.data.tax,
                shipping: res2.data.shipping
            }

            dispatch(setCart(resData));
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            <div className="max-w-xl w-full bg-base-100 my-4 py-8">

                <div className="flex items-center gap-4">
                    <img
                        src={product.image}
                        alt=""
                        className="h-24 w-24 object-cover"
                    />

                    <div>
                        <h3 className="text-xl text-gray-900">{product.title}</h3>

                        <dl className="mt-0.5 space-y-px text-lg text-gray-600">
                            <div>
                                <dd className="inline">{product.company}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">

                        <div className="border border-neutral px-4 py-2">
                            Quant: {cartItem.quantity}
                        </div>
                        <div className="border border-neutral px-3 py-2">
                            Size: {`${cartItem.size}UK`}
                        </div>

                        <button onClick={deleteCartItem} className="text-gray-600 transition hover:text-red-600 px-2">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-8 w-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CartCard;
