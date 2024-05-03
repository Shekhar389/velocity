import { Link } from "react-router-dom";

const AccountLogin = () => {
    return (
        <>
            {/* <div className="card-body card-bordered border-teal-300 rounded-box flex flex-row justify-evenly">
                <span className="text-center text-lg font-semibold">
                    Already Have An Account?
                </span>
                <div>
                    <Link to='/login'>
                        <button className="btn btn-outline btn-success">Login</button>
                    </Link>
                </div>
            </div> */}

<div className="card-body border-teal-500 bg-base-100 rounded flex flex-row justify-evenly p-4">
    <span className="text-center text-lg font-semibold text-teal-800">
        Already Have An Account?
    </span>
    <div>
        <Link to='/login'>
            <button className="btn bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Login</button>
        </Link>
    </div>
</div>

        </>
    );
};

export default AccountLogin;
