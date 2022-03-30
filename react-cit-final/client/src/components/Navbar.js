import {Fragment, useContext, useEffect, useRef, useState} from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {HeartIcon, MenuIcon, ShoppingBagIcon, XIcon} from '@heroicons/react/outline'
import logo from '../assets/logo.svg'
import Delay from "react-delay";
import {useSpring, animated, useChain, useSpringRef} from "react-spring";
import {UserContext} from "../contexts/User";
import {useNavigate} from "react-router-dom";
import {Badge, Button, ButtonGroup} from "@mui/material";
const navigation = {
    pages: [
        {
            name: 'Women',
            href: '/clothes/women',
        },
        {
            name: 'Men',
            href: '/clothes/men',
        },
        {
            name: 'Accessories',
            href: '/accessories',
        },

    ],
}


export default function Navbar() {
    const [open, setOpen] = useState(false)
    const hoverItem = useRef(null)
    const [ state, dispatch ] = useContext(UserContext)
    const [auth, setAuth] = useState(false)
    const [wishCount, setWishCount] = useState("")
    const localAuth =localStorage.getItem('auth')
    const navigate = useNavigate();
    const wish = localStorage.getItem('wish');
    useEffect(()=>{
        console.log(wish)
        if(localAuth==='true'){
            setAuth(true)
            setWishCount(wish)
        }else{
            setAuth(false)
        }
    }, [localAuth, wishCount])

    const signOut=()=>{
        localStorage.setItem('auth', 'false')
        setAuth(false)
        navigate('/')
    }
    return (
        <div className="bg-white navbar ">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto sidebar text-lg">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="border-t border-gray-200 py-16 px-4 space-y-6 ">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900 ">
                                            {page.name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                            {!auth
                                ?<div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                    <div className="flow-root">
                                        <a href="/login" className="-m-2 p-2 block font-medium text-gray-900">
                                            Sign in
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="/register" className="-m-2 p-2 block font-medium text-gray-900">
                                            Create account
                                        </a>
                                    </div>
                                </div>
                                :<div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                    <div className="flow-root">
                                        <a onClick={()=>{signOut()}}
                                           className="-m-2 p-2 block font-medium text-gray-900">
                                            Log out
                                        </a>
                                    </div>
                                </div>
                            }

                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header className="fixed bg-white z-50">
                <p className="bg-pink-500 h-10 flex items-center justify-center text-lg font-medium text-white px-4 sm:px-6 lg:px-8 w-screen">
                    Get free delivery on orders over $100
                </p>

                <nav aria-label="Top" className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="h-16 flex items-center">
                            <button
                                type="button"
                                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="/">
                                <img
                                src={logo}
                                alt={""}
                                height={50}
                                width={50}
                                />
                                </a>

                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="h-full flex space-x-8" >
                                    {navigation.pages.map((page,    index) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className=" mt-5 desktop:text-xl text-sm font-medium text-gray-700 hover:text-secondary-700"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                {!auth
                                    ?<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <a href="/login" className="desktop:text-xl text-sm font-medium text-gray-700 hover:text-secondary-700">
                                            Sign in
                                        </a>

                                        <a href="/register" className="desktop:text-xl text-sm font-medium text-gray-700 hover:text-secondary-700">
                                            Create account
                                        </a>
                                    </div>
                                    :<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <p className="desktop:text-xl text-sm font-medium text-gray-700 hover:text-secondary-700">
                                            Hello, {localStorage.getItem("name")}
                                        </p>
                                        <a onClick={()=>{signOut()}}
                                           className="desktop:text-xl text-sm font-medium text-gray-700 hover:text-secondary-700">
                                            Sign out
                                        </a>
                                    </div>

                                }


                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <a href="/wishlist" className="p-2 text-gray-400 hover:text-gray-500">
                                        {auth
                                            ?<Badge color="error" badgeContent={wishCount}>
                                                <HeartIcon className="w-6 h-6" aria-hidden="true" />{" "}
                                             </Badge>
                                            :""
                                        }
                                    </a>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <a href="/" className="group -m-2 p-2 flex items-center">
                                        <ShoppingBagIcon
                                            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export const useAnimation = ref => {
    const springs = useSpring({
        from: { opacity: 0, transform: "scale(0.8)" },
        to: [{ opacity: 0.8, transform: "scale(1.0)" }, { opacity: 1 }],
        ref: ref
    });
    return springs;
};



const List = ({ drpItem }) => {
    return (
            <a
                className="desktop:text-lg text-sm font-medium text-gray-700 hover:text-secondary-700"
                href={drpItem.href}
            >{drpItem.name}</a>
    );
};
const DropdownSection = ({items}) => {
    let base = 70
    return (
        <div className="absolute text-gray-700 bg-white pt-1 w-32">
            {
                items.map((item, index) =>{
                    base = base + 40
                    return(
                        <Delay wait={base} key={index}>
                            <List  drpItem={item} />
                        </Delay>

                    )

                })
            }
        </div>
    );
};