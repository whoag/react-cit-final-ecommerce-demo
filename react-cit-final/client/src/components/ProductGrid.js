import {ProductData} from "./data/ProductData";
import {HeartIcon as HeartOutline} from "@heroicons/react/outline";
import {HeartIcon as HeartSolid} from "@heroicons/react/solid";
import React, {useState} from "react";


export default function ProductGrid({ title}) {
    const [heart, setHeart] = useState(false)
    function addToWishList() {
        setHeart(true)
    }

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">{title}</h2>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {ProductData.map((product) => (
                        <>
                            <div key={product.id} className="group">
                                <a  href={`/product/${product.slug}`}>
                                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                        <img
                                            src={product.image}
                                            alt={product.description}
                                            className="w-full h-full object-center object-contain group-hover:opacity-75"
                                        />
                                    </div>
                                </a>
                                <div className="grid grid-cols-2 grid-rows-1">
                                    <div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                    </div>
                                    {!heart
                                        ?<HeartSolid className="w-6 h-6 place-self-end"/>
                                        :<HeartOutline className="w-6 h-6 place-self-end" onCLick={addToWishList} />
                                    }

                                </div>

                            </div>
                        </>

                    ))}
                </div>
            </div>
        </div>
    )
}