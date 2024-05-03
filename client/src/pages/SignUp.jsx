import SignUpForm from "../components/sign_up/SignUpForm.jsx";
import MiscSignUpForm from "../components/sign_up/MiscSignUpForm.jsx";

const SignUp = () => {
    return (
        <div
            className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center gap-8 px-8">
            <SignUpForm />
            <MiscSignUpForm />
        </div>
    );
};

export default SignUp;
