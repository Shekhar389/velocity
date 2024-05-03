import CartCard from "./CartCard.jsx";
import { useSelector } from "react-redux";

const CartList = () => {

    const cart = useSelector((state) => state.cart);

    return (
        <>
            {
                cart.cartItems.map(cartItem => (
                    <div key={cartItem.productId}>
                        <CartCard cartItem={cartItem} />
                    </div>
                ))
            }
        </>
    )
}

export default CartList;
