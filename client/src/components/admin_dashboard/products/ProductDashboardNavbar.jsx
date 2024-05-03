import { Link } from "react-router-dom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from "../../../axios/baseUrl.js";

const schema = z.object({
    id: z.string().min(1, "Please enter product Id"),
});

const ProductDashboardNavbar = ({ setProducts }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        const response = await baseUrl.get(`/products/admin/${data.id}`);
        const products = response.data;
        setProducts(products);
    };

    return (
        <>
            <div className="flex justify-between bg-base-100 items-center max-h-[1vh] px-[8rem]">
                <div className="flex-1">
                    <Link to={"/admin-dashboard/products/create-product"}>
                        <button className={"btn btn-outline btn-sm"}>
                            New Product
                        </button>
                    </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-4">
                        <input {...register('id')} type="text" placeholder={errors.id ? errors.id.message : "Search By Id"} className="input input-bordered border-base-600 w-[24rem]" />
                        <button className="btn btn-ghost btn-circle btn-outline border-base-300">
                            <svg className="w-8 h-8 fill-current" fill="none" stroke="currentColor" strokeWidth={2}
                                viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductDashboardNavbar;
