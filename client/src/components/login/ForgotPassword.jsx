import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from '../../axios/baseUrl';
import { useState } from 'react';

const schema = z.object({
    email: z.string().email("Invalid Email").min(1, 'Email is required'),
});

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [sentEmail, setSentEmail] = useState(false);

    const onSubmit = async (data) => {
        try {
            const response = await baseUrl.post(`/reset`, { email: data.email });
            if (response.status === 202) {
                setSentEmail(true);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="grid justify-center items-center min-h-[70vh]">
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Enter E-mail</span>
                                {errors.email && <p className={"px-5 "}>{errors.password.message}</p>}
                            </label>
                            <input {...register('email')} type="email" placeholder="E-mail"
                                className="input input-bordered" />
                        </div>
                        {sentEmail && <p className={"text-green-700 p-1"}>Please check your Email</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Send Link</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { ForgotPassword };
