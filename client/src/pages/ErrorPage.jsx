import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="hero min-h-[70vh] px-8 bg-base-100">
            <div className="hero-body text-center">
                <div className="max-w-lg">
                    <h1 className="mb-5 font-semibold text-gray-300 text-4xl md:text-6xl">404 | Not Found</h1>
                    <p className="mb-5 text-gray-500 text-xl">We cannot find that page.</p>

                    <Link to='/'>
                        <button className="btn btn-lg btn-outline">
                            Go Back Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
