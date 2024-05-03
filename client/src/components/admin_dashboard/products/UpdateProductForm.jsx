import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from "../../../axios/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateProductForm = () => {

    const { productId } = useParams();
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const fetchProduct = async () => {
        const res = await baseUrl.get(`/products/${productId}`);
        const product = res.data;
        setTitle(product.title);
        setCompany(product.company);
        setCategory(product.category);
        setPrice(product.price);
        setDescription(product.description);
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const schema = z.object({
        title: z.string().min(1, 'Title is required').default(title),
        company: z.string().min(1, 'Company is required').default(company),
        category: z.string().min(1, 'Category is required').default(category),
        price: z.number().min(0, 'Price should be greater than 0').default(price),
        description: z.string().min(1, 'Description is required').default(description),
        image: z.instanceof(FileList).optional()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (key !== 'image') {
                    formData.append(key, data[key]);
                }
            });

            if (data["image"].length !== 0) {
                formData.append("image", data["image"][0]);
            }

            await baseUrl.put(`/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate(`/admin-dashboard/products`)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card max-w-screen-md w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Title</span>
                                {errors.title && <p className={"px-5 "}>{errors.title.message}</p>}
                            </label>
                            <input {...register('title')} type="text" placeholder="title"
                                className="input input-bordered" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Company</span>
                                {errors.company && <p className={"px-5"}>{errors.company.message}</p>}
                            </label>
                            <input {...register('company')} type="text" placeholder="company"
                                className="input input-bordered" value={company} onChange={e => setCompany(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Category</span>
                                {errors.category && <p className={"px-5"}>{errors.category.message}</p>}
                            </label>
                            <input {...register('category')} type="text" placeholder="category"
                                className="input input-bordered" value={category} onChange={e => setCategory(e.target.value)} />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Price</span>
                                {errors.price && <p className={"px-5"}>{errors.price.message}</p>}
                            </label>
                            <input {...register('price', { setValueAs: value => parseFloat(value) })} type="number"
                                placeholder="price" className="input input-bordered" value={price} onChange={e => setPrice(e.target.value)} />

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Image</span>
                                {errors.image && <p className={"px-5"}>{errors.image.message}</p>}
                            </label>
                            <input {...register('image')} type="file" className="file-input file-input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Description</span>
                                {errors.description && <p className={"px-5"}>{errors.description.message}</p>}
                            </label>
                            <textarea {...register('description')} className="textarea textarea-bordered"
                                placeholder="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-outline" type={"submit"}>Update Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProductForm;
