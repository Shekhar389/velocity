import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../axios/baseUrl.js";
import Divider from "../components/ui/Divider.jsx";
import { loadStripe } from "@stripe/stripe-js";
const ProductDetail = () => {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("6");

    const sizes = ["6", "7", "8", "9", "10", "11"];

    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    const fetchProduct = async () => {
        const res = await baseUrl.get(`/products/${productId}`);
        setProduct(res.data);
    }
    const handleDecreaseQuantity = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1);
    }
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const addToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            await baseUrl.post(`/carts`, {
                productId: productId,
                quantity: quantity,
                size: size
            })
            alert('Product added to cart');
            navigate('/products');
        } catch (e) {
            console.log(e)
        }
    }

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51NU6M8SGc2BOiEgPZKkvaZpCD0GHWfOruWn4gyy4myO8DhWm8PA9UxKW0FyfnAYUeEPiYlZlE9upH8h1j2065kex00M0uT8eIc');

        const body = {
            product: product,
        }
        console.log(body);
        const response = await baseUrl.post(`/payments/create-checkout-session`, body);

        await stripe.redirectToCheckout({
            sessionId: response.data.id,
        });
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            {/* <div className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center px-8">

                <div className="card max-w-xl w-full bg-base-100">
                    <div className="card-body">
                        <figure>
                            <img src={product.image} alt="" className='rounded-lg' />
                        </figure>

                        <div className="flex flex-row gap-4 mt-4">
                            <div className="badge badge-outline badge-lg">{product.category}</div>
                            <div className="badge badge-outline badge-lg">{product.company}</div>
                        </div>
                    </div>
                </div>

                <div className="card max-w-xl w-full bg-base-100">
                    <div className="card-body">

                        <div className="mb-4">
                            <h1 className='text-4xl mb-2'>{product.title}</h1>

                            <p>
                                {product.description}
                            </p>
                        </div>

                        <div className='text-2xl mb-2'>₹{product.price}</div>

                        <Divider />

                        <div className="text-lg">Quauntity</div>

                        <div className='flex flex-row items-center gap-6'>
                            <button onClick={() => handleDecreaseQuantity()}
                                className="btn btn-outline btn-md text-lg">-
                            </button>
                            <span className="text-xl">{quantity}</span>
                            <button onClick={() => handleIncreaseQuantity()}
                                className="btn btn-outline btn-md text-lg">+
                            </button>
                        </div>

                        <Divider />

                        <div className="text-lg">Size</div>

                        <div className='flex flex-row items-center gap-3'>
                            {
                                sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`btn btn-outline btn-sm text-sm ${s === size && 'bg-blue-500 text-white'}`}
                                    >
                                        {`${s}UK`}
                                    </button>
                                ))
                            }
                        </div>

                        <Divider />

                        <button onClick={() => addToCart()} className="btn btn-lg mt-4 btn-outline">Add To Cart</button>
                    </div>
                </div>
            </div> */}

<section>
<div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
    <div className="relative z-10 lg:py-16">
      <div className="relative h-64 sm:h-80 lg:h-full">
        <img
          alt=""
          src={product.image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>

    <div className="relative flex items-center bg-blue-100">
      <span
        className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-blue-100"
      ></span>

      <div className="p-8 sm:p-16 lg:p-24">
        <h2 className="text-2xl text-black font-bold sm:text-3xl">
          {product.title}
        </h2>

        <h2 className="mt-4 text-black text-lg">
         Price {product.price}
        </h2>
        <p className="mt-4 text-gray-600">
         {product.description}
        </p>

        <button onClick={makePayment}
          className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>
</section>
        </>
    )
}

export default ProductDetail;
