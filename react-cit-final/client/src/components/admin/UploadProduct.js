import React, {useState} from "react";
import {LockClosedIcon} from "@heroicons/react/solid";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function UploadProduct() {
    const [error, setError] = useState("")
    const validationSchema = yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const onSubmit = data => {
        let formData = JSON.stringify(data)
        axios
            .post(
                'http://localhost:5000/api/uploads',
                formData,
                { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}}
            )
            .then(response => {
                let userData = response.data.user;

                navigate('/')
                window.location.reload();
            })
            .catch(error => {
                if(error.response.status === 404){
                    setError(error.response.data.emailnotfound)
                }else if(error.response.status ===400){
                    setError(error.response.data.passwordincorrect)

                }
            });
    };
    return(
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                            Overview
                        </h6>
                        <h2 className="text-white text-xl font-semibold">Sales value</h2>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-350-px">
                    <form className="mt-8 space-y-6" name='login' id="login"  onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    {...register('email')}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product name"
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="sr-only">
                                    Category
                                </label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product category"
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="sr-only">
                                    Price
                                </label>
                                <input
                                    {...register('email')}
                                    id="price"
                                    name="price"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product price"
                                />
                            </div>                <div>
                            <label htmlFor="slug" className="sr-only">
                                Slug
                            </label>
                            <input
                                {...register('email')}
                                id="slug"
                                name="slug"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Product slug"
                            />
                        </div>
                            <div>
                                <label htmlFor="desc" className="sr-only">
                                    Description
                                </label>
                                <textarea
                                    id="desc"
                                    name="desc"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product description"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="sr-only">
                                    Image
                                </label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product image"
                                />
                            </div>
                            <div className="text-red-500">{error}</div>
                        </div>

                        <div>
                            <button
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
