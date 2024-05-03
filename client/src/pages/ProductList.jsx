import Filter from "../components/product_list/Filter.jsx"
import ProductLayout from "../components/product_list/ProductLayout.jsx"
import { useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    return (
        <>
            <Filter setProducts={setProducts} />
            <ProductLayout products={products} setProducts={setProducts} />
            {/* <Pagination/> */}
        </>
    )
}

export default ProductList;
