import WishTop from "../components/WishTop";
import React, {useEffect, useState} from "react";
import {wishlistData} from "../components/data/WishlistData";
import ProductGrid from "../components/ProductGrid";
import ProductCard from "../components/ProductCard";


export default function Wishlist(){
    const [isEmpty, setIsEmpty] = useState(null)
    const [products, setProducts] = useState(undefined)
    const [amount, setAmount] = useState(0)

    useEffect(()=>{
        if(localStorage.getItem('wish') === '0'){
            setIsEmpty(true)
        }else{
            setIsEmpty(false)
            wishlistData().then((res)=>{
                setProducts(res)
                let count = res.length
                setAmount(count)
            })
        }
    }, [])
    return (
        <div className="min-h-screen w-screen pt-32 px-12">
            <WishTop amount={amount} />
            {isEmpty
                ?""

                :  <div className="bg-white">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                        <div className="pt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products !== undefined ||  typeof products !== "undefined"
                                ? products.map((product, idx) => {
                                 return(
                                     <ProductCard
                                         key={idx}
                                         title={product[0].name}
                                         image={`http://localhost:5000/api/products/images/${product[0].image}`}
                                         description={product[0].description}
                                         price={product[0].price}
                                         slug={product[0].slug}

                                     />
                                 )
                                })
                                :""
                            }
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}