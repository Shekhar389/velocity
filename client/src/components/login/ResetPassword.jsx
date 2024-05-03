import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../axios/baseUrl';

const schema = z.object({
    password: z.string().min(1, "Password is required").min(6, 'Password is too short [min 6 chars]'),
});

const ResetPassword = () => {

    const { resetToken } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await baseUrl.post(`/newPassword`, { password: data.password, resetToken: resetToken })
            navigate('/login');
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
                                <span className="label-text text-lg">New Password</span>
                                {errors.password && <p className={"px-5 "}>{errors.password.message}</p>}
                            </label>
                            <input {...register('password')} type="password" placeholder="password"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { ResetPassword };
