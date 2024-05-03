import Divider from "../ui/Divider.jsx";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
    return (
        <>
            <div className="flex justify-evenly bg-base-100 items-center max-h-[1vh]">
                <div>
                    <Link to={"/admin-dashboard/products"}>
                        <button className="link link-hover text-lg font-semibold"
                        >
                            Products
                        </button>
                    </Link>
                </div>
                <Link to={"/admin-dashboard/users"}>
                    <div>
                        <button className="link link-hover text-lg font-semibold"
                        >
                            Users
                        </button>
                    </div>
                </Link>
                <Link to={"/admin-dashboard/orders"}>
                    <div>
                        <button className="link link-hover text-lg font-semibold"
                        >
                            Orders
                        </button>
                    </div>
                </Link>
            </div>

            <Divider />
        </>
    );
};

export default DashboardNavbar;
