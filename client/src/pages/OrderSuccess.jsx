import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="hero bg-base-100 min-h-[70vh]">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl">
                        Order Successful
                    </h1>
                    <Link to={"/orders"}>
                        <button className="btn btn-lg mt-4 btn-outline">Check All Orders</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { OrderSuccess }; 
