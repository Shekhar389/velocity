import LoginForm from "../components/login/LoginForm.jsx";
import MiscLoginForm from "../components/login/MiscLoginForm.jsx";

const Login = () => {
    return (
        <div
            className="min-h-[70vh] bg-base-100 flex flex-col md:flex-row place-content-evenly items-center gap-8 px-8">
            <LoginForm />
            <MiscLoginForm />
        </div>
    );
};

export default Login;
