import ThirdPartyLogin from "../login/ThirdPartyLogin.jsx";
import AccountLogin from "./AccountLogin.jsx";

const MiscSignUpForm = () => {
    return (
        <>
            {/*oauth login*/}
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <ThirdPartyLogin />
                <div className="my-2"></div>
                <AccountLogin />
            </div>
        </>
    );
};

export default MiscSignUpForm;
