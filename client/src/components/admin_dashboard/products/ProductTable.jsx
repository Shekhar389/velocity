import { useEffect, useState } from "react";
import { baseUrl } from "../../../axios/baseUrl.js";
import { Link } from "react-router-dom";

const ProductTable = ({ products, setProducts }) => {

    const fetchProducts = async () => {
        const res = await baseUrl.get("/products");
        setProducts(res.data);
    }

    const deleteProduct = async (id) => {
        await baseUrl.delete(`/products/${id}`);
        await fetchProducts();
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main>
            <div className="px-12">
                <table className="table table-zebra table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company / Category</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product._id}>

                                    <td>
                                        <Link to={`/product-detail/${product._id}`}>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img
                                                            src={product.image}
                                                            alt="Product Image" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.title}</div>
                                                    <div className="text-sm opacity-50">{product._id}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td>
                                        {product.company}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{product.category}</span>
                                    </td>
                                    <td>
                                        {`₹${product.price}`}
                                    </td>
                                    <td>
                                        <Link to={`/admin-dashboard/products/update-product/${product._id}`}>
                                            <button className="btn btn-outline btn-primary btn-sm">Modify</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteProduct(product._id)}
                                            className="btn btn-outline btn-error btn-sm">Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* <Pagination/> */}

        </main>
    )
}

export default ProductTable;
