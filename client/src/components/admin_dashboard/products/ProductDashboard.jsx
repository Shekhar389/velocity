import ProductTable from "./ProductTable.jsx";
import ProductDashboardNavbar from "./ProductDashboardNavbar.jsx";
import Divider from "../../ui/Divider.jsx";
import { useState } from "react";

const ProductDashboard = () => {

    const [products, setProducts] = useState([]);

    return (
        <main>
            <ProductDashboardNavbar setProducts={setProducts} />
            <Divider />
            <ProductTable products={products} setProducts={setProducts} />
        </main>
    )
}

export default ProductDashboard;
