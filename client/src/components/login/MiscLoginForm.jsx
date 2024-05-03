import ThirdPartyLogin from "./ThirdPartyLogin.jsx";
import NoAccountSignUp from "./NoAccountSignUp.jsx";

const MiscLoginForm = () => {
    return (
        <>
            {/*oauth login*/}
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <ThirdPartyLogin />
                <div className="my-2"></div>
                <NoAccountSignUp />
            </div>
        </>
    );
};

export default MiscLoginForm;
