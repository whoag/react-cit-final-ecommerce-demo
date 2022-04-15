import {ProductData} from "./data/ProductData";
import {HeartIcon as HeartOutline} from "@heroicons/react/outline";
import {HeartIcon as HeartSolid} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "./ProductCard";


export default function ProductGrid({title, category}) {
    const [heart, setHeart] = useState(false)
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0);
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
                        ? products.map((product, idx) => (
                            <ProductCard
                                key={idx}
                                title={product.name}
                                image={`http://localhost:5000/api/products/images/${product.image}`}
                                description={product.description}
                                price={product.price}
                                slug={product.slug}
                                active
                            />
                        ))
                        :""
                    }
                </div>
            </div>
        </div>
    )
}