import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from "../../axios/baseUrl.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice.js";

const schema = z.object({
    email: z.string().email("Enter a Valid Email").min(1, 'Email is required'),
    password: z.string().min(1, "Password is required").min(6, 'Password is too short [min 6 chars]'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [invalid, setInvalid] = useState(false);

    const onSubmit = async (data) => {
        try {
            const res = await baseUrl.post('/login', data);
            const user = res.data.user;

            // baseUrl.interceptors.request.use((config) => {
            //     config.headers.Authorization = `Bearer ${token}`;
            //     return config;
            // });

            dispatch(login());

            if (user.roleAdmin) {
                return navigate('/admin-dashboard/products');
            }
            navigate('/products');
        } catch (e) {
            setInvalid(true);
        }
    };

    return (
        <>
            {/* <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    {invalid && <p className={"text-red-500"}>Invalid Credentials</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Email</span>
                                {errors.email && <p className={"px-5"}>{errors.email.message}</p>}
                            </label>
                            <input {...register('email')} type="email" placeholder="email"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                                {errors.password && <p className={"px-5 "}>{errors.password.message}</p>}
                            </label>
                            <input {...register('password')} type="password" placeholder="password"
                                className="input input-bordered" />
                            <label className="label">
                                <p className="label-text-alt link link-hover" onClick={() => navigate('/reset')}>Forgot
                                    password?</p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Login</button>
                        </div>
                    </form>
                </div>
            </div> */}

            {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">Get started today</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <p className="text-center text-lg font-medium">Sign in to your account</p>

      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
          {...register('email')}
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
          {...register('password')}
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

    </form>
  </div>
</div>
        </>
    );
};

export default LoginForm;
