import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import { useEffect } from "react";
import { baseUrl } from "../../axios/baseUrl.js";

const ProductLayout = ({ products, setProducts }) => {

    const fetchProducts = async () => {
        const res = await baseUrl.get('/products')
        setProducts(res.data);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 justify-items-center p-12">

                {
                    products.map(product => (
                        <div key={product._id}>
                            {
                                <Link to={`/product-detail/${product._id}`}>
                                    <ProductCard product={product} />
                                </Link>
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductLayout;
