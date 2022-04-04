import {ProductData} from "./data/ProductData";
import {HeartIcon as HeartOutline} from "@heroicons/react/outline";
import {HeartIcon as HeartSolid} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import axios from "axios";


export default function ProductGrid({title, category}) {
    const [heart, setHeart] = useState(false)
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0);

    function addToWishList() {
        setHeart(true)
    }

    let stop = 7;

    useEffect(()=>{
        const url = `http://localhost:5000/api/products/${category}`
        if(count < 2){
            axios.get(
                url,
                { headers: { 'Access-Control-Allow-Origin': '*'}, params: {category: category}}
            ).then((res) =>{
                setProducts(res.data)


            })
        }

        setCount(count+1)

    }, [products])

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">{title}</h2>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products
                        ? products.map((product) => (
                            <>
                                <div key={product.id} className="group">
                                    <a href={`/product/${product.slug}`}>
                                        <div
                                            className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                            <img
                                                src={`http://localhost:5000/api/products/images/${product.image}`}
                                                alt={product.description}
                                                className="w-full h-full object-center object-contain group-hover:opacity-75"
                                            />
                                        </div>
                                    </a>
                                    <div className="grid grid-cols-2 grid-rows-1">
                                        <h3 className="mt-4 text-lg text-gray-700 w-full col-span-2">{product.name}</h3>
                                        <div>
                                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                        </div>
                                        {heart
                                            ? <HeartSolid className="w-6 h-6 place-self-end"/>
                                            : <HeartOutline className="w-6 h-6 place-self-end" onCLick={addToWishList}/>
                                        }

                                    </div>

                                </div>
                            </>

                        ))
                        :""
                    }
                </div>
            </div>
        </div>
    )
}