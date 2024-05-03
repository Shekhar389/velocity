import Divider from "../ui/Divider.jsx";

const ThirdPartyLogin = () => {
    return (
        <>
            <div className="card-body card-bordered border-teal-300 rounded-box">
                <div className="text-center text-xl font-semibold text-teal-700">
                    Third Party Login
                    <Divider />
                </div>
                <div className="flex flex-row justify-evenly">
                    {/*Google*/}
                    <div className="text-teal-600">
                        <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fauth%2Fgoogle%2F&client_id=91208706310-f1iputp0p9ivpnia3n6sh6ar0b26l659.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email"
                            target={"_top"} className="btn btn-ghost btn-border">
                            <svg className="h-8 w-8 fill-current" fill="none" stroke="currentColor"
                                viewBox="0 0 512 512">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThirdPartyLogin;
