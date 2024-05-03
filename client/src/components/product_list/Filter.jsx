import Divider from "../ui/Divider.jsx";
import { useState } from "react";
import { baseUrl } from "../../axios/baseUrl.js";

const filters = {
    companies: ["Nike", "Adidas", "Puma", "Sketchers"],
    categories: ["Sneaker", "Lifestyle", "Running", "Football"],
}

const Filter = ({ setProducts }) => {

    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleCompanyChange = (event) => {
        const { checked, value } = event.target;
        setSelectedCompanies(prevState => checked ? [...prevState, value] : prevState.filter(company => company !== value));
    };

    const handleCategoryChange = (event) => {
        const { checked, value } = event.target;
        setSelectedCategories(prevState => checked ? [...prevState, value] : prevState.filter(category => category !== value));
    };

    const handleFilter = async () => {
        // Create a query parameter string
        let queryParams = `?companies=${selectedCompanies.join(',')}&categories=${selectedCategories.join(',')}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

        try {
            // Make a GET request to your server-side endpoint
            const response = await baseUrl.get(`/products${queryParams}`);

            setProducts(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetFilter = async () => {
        setSelectedCompanies([]);
        setSelectedCategories([]);
        setMinPrice('');
        setMaxPrice('');

        try {
            const response = await baseUrl.get(`/products`);

            setProducts(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className="navbar bg-base-100 px-4 lg:px-12">

                <div className="navbar-start">
                    <p className="text-2xl font-semibold"> New Arrivals </p>
                </div>


                <div className="navbar-end gap-4">

                    <div className="drawer-end">

                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="drawer-button btn btn-ghost btn-circle">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}
                                    viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                </svg>
                            </label>

                        </div>

                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-100">
                                <div className="mb-8">
                                    <p className="text-xl mb-4">Category</p>
                                    {filters.categories.map(category => (
                                        <div className="form-control" key={category}>
                                            <label className="label cursor-pointer">
                                                <span className="text-md">{category}</span>
                                                <input type="checkbox" className="checkbox checkbox-sm" value={category}
                                                    onChange={handleCategoryChange} checked={selectedCategories.includes(category)} />
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <Divider />

                                <div className="mb-8">
                                    <p className="text-xl mb-8">Price</p>
                                    <div className="form-control">
                                        <div className="mb-4">
                                            <span className="text-md">Minimum Price: </span>
                                            <input type="text" placeholder="Minimum Amount"
                                                className="input input-bordered w-full max-w-xs" value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)} />
                                        </div>
                                        <div>
                                            <span>Maximum Price: </span>
                                            <input type="text" placeholder="Maximum Amount"
                                                className="input input-bordered w-full max-w-xs" value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <Divider />

                                <div className="mb-8">
                                    <p className="text-xl mb-4">Company</p>
                                    {filters.companies.map(company => (
                                        <div className="form-control" key={company}>
                                            <label className="label cursor-pointer">
                                                <span className="text-md">{company}</span>
                                                <input type="checkbox" className="checkbox checkbox-sm" value={company}
                                                    onChange={handleCompanyChange} checked={selectedCompanies.includes(company)} />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <Divider />
                                <div className="flex justify-evenly">
                                    <button className="btn btn-ghost" onClick={handleFilter}>Apply Filters</button>
                                    <button className="btn btn-ghost" onClick={resetFilter}>Reset Filters</button>
                                </div>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Filter;
