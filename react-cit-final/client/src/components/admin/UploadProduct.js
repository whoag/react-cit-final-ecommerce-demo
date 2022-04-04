import React, {useState} from "react";
import {LockClosedIcon} from "@heroicons/react/solid";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import mime from 'mime'
const categories = [
    { id: "Womens", name: 'Women', unavailable: false },
    { id: "Mens", name: 'Men', unavailable: false },
    { id: "Accessories", name: 'Accessories', unavailable: false },
]

export default function UploadProduct() {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [value, setValue] = useState("")
    const validationSchema = yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const onSubmit = data => {
        // const dataObj = {
        //     name: data.name,
        //     category_id: data.category_id,
        //     price: data.price,
        //     description: value,
        //     image: data.image[0]
        // }
        // let formData = new FormData(dataObj);
        // console.log(formData)
        let form = document.getElementById('productUpload')
        let formData = new FormData(form);
        console.log(formData)
        axios
            .post(
                'http://localhost:5000/api/products',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data; boundary=${data._boundary}', 'Access-Control-Allow-Origin': '*'}}
            )
            .then(response => {

                navigate('/')
                window.location.reload();
            })
            .catch(error => {
             console.log(error)
            });
    };
    return(
        <div className="relative flex flex-col min-w-0 break-words w-1/2 mb-6 shadow-xl   rounded-2xl p-6 border-2 border-pink-500/20 ">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-pink-600 mb-1 text-sm font-semibold">
                            ADD
                        </h6>
                        <h2 className="text-black text-4xl font-semibold">Product</h2>
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-black opacity-10 my-auto"/>
            <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-350-px">
                    <form className="mt-2 " name='productUpload' id="productUpload"  onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm grid grid-cols-1 gap-y-2">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    {...register('name')}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product name"
                                />
                            </div>
                            <div className="rounded-t-md border border-gray-300 px-3 py-2 text-gray-500 text-sm w-full relative flex flex-row justify-between bg-white ">
                                <label htmlFor="category" >
                                    Category
                                </label>
                                <select name="category" id="category" className="w-2/5"
                                        {...register('category')}
                                >
                                    <option value="" disabled>Select</option>
                                    {categories.map((category, i)=>(
                                        <option value={category.id} key={i}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="sr-only">
                                    Price
                                </label>
                                <input
                                    {...register('price')}
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="any"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product price"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="sr-only">
                                    Description
                                </label>
                                <textarea
                                    {...register('description')}
                                    value={value}
                                    onChange={(e)=> setValue(e.target.value)}
                                    id="desc"
                                    name="description"
                                    required
                                    form="productUpload"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product description"
                                />
                            </div>
                            <div>
                                    <label className="inline-block mb-2 text-gray-500">Image Upload</label>
                                            <input type="file" name="image"
                                                   id="image"
                                                   {...register('image')}
                                            />

                            </div>
                            <div className="text-red-500">{error}</div>
                        </div>

                        <div>
                            <button
                                className="group relative w-2/5 mx-auto flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
