import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from "../axios/baseUrl";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const schema = z.object({
    houseNumber: z.string().min(1, "Address line is required"),
    mobileNumber: z.string().min(10, "Mobile number must be 10 digits" )
        .refine((value) => {
            if(value == +value) return true;
        }),
    town: z.string().min(1, "Town is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(5, "Zipcode Invalid"),
});

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51NU6M8SGc2BOiEgPZKkvaZpCD0GHWfOruWn4gyy4myO8DhWm8PA9UxKW0FyfnAYUeEPiYlZlE9upH8h1j2065kex00M0uT8eIc');

        const body = {
            products: cart.cartItems,
        }

        const response = await baseUrl.post(`/payments/create-checkout-session`, body);

        await stripe.redirectToCheckout({
            sessionId: response.data.id,
        });
    }

    const onSubmit = async (data) => {
        try {

            const deliveryAddress = `House Number: ${data.houseNumber},Town: ${data.town},City: ${data.city},State: ${data.state}(${data.zipcode})- Mobile Number: ${data.mobileNumber}`;

            await baseUrl.patch(`/users`, { deliveryAddress });

            await makePayment();

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="flex justify-center align-middle">
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Address Line</span>
                                {errors.houseNumber && <p className={"px-5"}>{errors.houseNumber.message}</p>}
                            </label>
                            <input {...register('houseNumber')} type="text" placeholder="address line"
                                className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Town</span>
                                {errors.town && <p className={"px-5"}>{errors.town.message}</p>}
                            </label>
                            <input {...register('town')} type="text" placeholder="Town"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">City</span>
                                {errors.city && <p className={"px-5"}>{errors.city.message}</p>}
                            </label>
                            <input {...register('city')} type="text" placeholder="city"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">State</span>
                                {errors.state && <p className={"px-5"}>{errors.state.message}</p>}
                            </label>
                            <input {...register('state')} type="text" placeholder="state"
                                className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Zipcode</span>
                                {errors.zipcode && <p className={"px-5"}>{errors.zipcode.message}</p>}
                            </label>
                            <input {...register('zipcode')} type="text" placeholder="zipcode"
                                className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Mobile Number</span>
                                {errors.mobileNumber && <p className={"px-5"}>{errors.mobileNumber.message}</p>}
                            </label>
                            <input {...register('mobileNumber')} type="text" placeholder="mobile number"
                                className="input input-bordered" />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Checkout</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
