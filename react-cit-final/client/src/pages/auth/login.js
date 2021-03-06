
import { LockClosedIcon } from '@heroicons/react/solid'
import {useContext, useEffect, useState} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form'
import { UserContext } from "../../contexts/User"
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import logo from "../../assets/logo.svg";

export default function Login() {
    const [ state, dispatch ] = useContext(UserContext)
    const [error, setError] = useState("")


    const { register, handleSubmit, formState } = useForm();

    const navigate = useNavigate()

    const onSubmit = data => {
        let formData = JSON.stringify(data)
        axios
            .post(
                'http://localhost:5000/api/login',
                formData,
                { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}}
            )
            .then(response => {
                let userData = response.data.user;
                let wish;
                if(userData.wishlist === ""){
                     wish = undefined
                }else{
                    wish= userData.wishlist
                }
                dispatch({
                    type: "LOGIN",
                    id: userData._id,
                    name: userData.firstName,
                    email: userData.email,
                    wishlist: wish,
                    auth: true,
                    admin: userData.admin
                })
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
    return (
        <>
            <div className="min-h-full flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            src={logo}
                            alt={""}
                            className="mx-auto"
                            height={50}
                            width={50}
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" name='login' id="login"  onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
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
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />

                            </div>
                            <div className="text-red-500">{error}</div>
                        </div>

                        {/*<div className="flex items-center justify-between">*/}
                            {/*<div className="flex items-center">*/}
                            {/*    <input*/}
                            {/*        id="remember-me"*/}
                            {/*        name="remember-me"*/}
                            {/*        type="checkbox"*/}
                            {/*        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"*/}
                            {/*    />*/}
                            {/*    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">*/}
                            {/*        Remember me*/}
                            {/*    </label>*/}
                            {/*</div>*/}

                            {/*<div className="text-sm">*/}
                            {/*    <a href="/forgot" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                            {/*        Forgot your password?*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        <div>
                            <button
                                disabled={formState.isSubmitting}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}