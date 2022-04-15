
import { LockClosedIcon } from '@heroicons/react/solid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../../contexts/User";
import logo from "../../assets/logo.svg";
export default function Register() {
    const [ state, dispatch ] = useContext(UserContext)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const validationSchema = yup.object().shape({
        fName: yup.string().required('First name is required'),
        lName: yup.string().required('Last name is required'),
        email: yup.string().required('Email is required'),
        password: yup.string().min(8).required('Password is required'),
        checkPassword: yup.string().min(8)
            .when("password", {
                is: (val) => (val && val.length > 0),
                then: yup.string().oneOf(
                    [yup.ref("password")],
                    "Passwords do not match"
                ),
            })
            .required("Confirm password is required"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm();
    const {errors} = formState

    const onSubmit = data => {
        let formData = JSON.stringify(data)
        axios
            .post(
                'http://localhost:5000/api/register',
                formData,
                { headers: { 'Content-Type': 'application/json' }}
            )
            .then(response => {
                let userData = response.data;
                dispatch({
                    type: "LOGIN",
                    id: userData._id,
                    name: userData.firstName,
                    email: userData.email,
                    wishlist: userData.wishlist,
                    auth: true,
                    admin: userData.admin
                })
                navigate('/')
                window.location.reload();
            })
            .catch(error => {
                if(error.response.status ===400){
                    setError(error.response.data.error)

                }
            });
    };

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-32  px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            src={logo}
                            className="mx-auto"
                            alt={""}
                            height={50}
                            width={50}
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm space-y-2">
                            <div className="grid grid-rows-1 grid-cols-2 gap-x-4">
                                <div>
                                    <label htmlFor="fName" className="sr-only">
                                        First name
                                    </label>
                                    <input
                                        {...register('fName')}
                                        id="fName"
                                        name="fName"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="First name"
                                    />
                                    <div className="invalid-feedback">{errors.fName?.message}</div>
                                </div>
                                <div>
                                    <label htmlFor="lName" className="sr-only">
                                        Last name
                                    </label>
                                    <input
                                        {...register('lName')}
                                        id="lName"
                                        name="lName"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Last name"
                                    />
                                    <div className="invalid-feedback">{errors.lName?.message}</div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    {...register('email')}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    {...register('password')}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <div>
                                <label htmlFor="check-password" className="sr-only">
                                    Confirm password
                                </label>
                                <input
                                    {...register('checkPassword')}
                                    id="checkPassword"
                                    name="checkPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm password"
                                />
                                <div className="invalid-feedback">{errors.checkPassword?.message}</div>
                            </div>
                            <div className="text-red-500">{error}</div>

                        </div>

                        {/*<div className="flex items-center justify-between">*/}
                        {/*    <div className="flex items-center">*/}
                        {/*        <input*/}
                        {/*            id="remember-me"*/}
                        {/*            name="remember-me"*/}
                        {/*            type="checkbox"*/}
                        {/*            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"*/}
                        {/*        />*/}
                        {/*        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">*/}
                        {/*            Remember me*/}
                        {/*        </label>*/}
                        {/*    </div>*/}

                        {/*    <div className="text-sm">*/}
                        {/*        <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                        {/*            Forgot your password?*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div>
                            <button
                                disabled={formState.isSubmitting}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}