import React, {useEffect, useState} from "react";
import { Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import {ProductData} from "./data/ProductData";
import ProductCard from "./ProductCard";


import 'swiper/css'
import 'swiper/css/autoplay';
import axios from "axios";


export default function FeaturedSlide(){
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0);

    let stop = 7;

    useEffect(()=>{
        const url = `http://localhost:5000/api/products`
        if(count < 2){
            axios.get(
                url,
                { headers: { 'Access-Control-Allow-Origin': '*'}}
            ).then((res) =>{
                setProducts(res.data)
            })
        }

        setCount(count+1)

    }, [products])

    return(
        <div className="h-80 max-w-screen my-6 ">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                loop={true}
                centeredSlidesBounds={true}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                style={{height: '110%', padding: '2rem 0', width: '75%'}}
            >
                {products
                   ? products.map((product, idx) => {
                        return(
                            <SwiperSlide
                                key={idx}
                                style={{height: 'fit-content', width: '300px', display:'flex', justifyContent: 'center' }}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive ?
                                            <ProductCard
                                                key={idx}
                                                title={product.name}
                                                image={`http://localhost:5000/api/products/images/${product.image}`}
                                                description={product.description}
                                                price={product.price}
                                                slug={product.slug}
                                                active
                                            />
                                            : <ProductCard
                                                key={idx}
                                                slug={product.slug}
                                                title={product.title}
                                                image={`http://localhost:5000/api/products/images/${product.image}`}
                                                description={product.description}
                                                price={product.price}
                                            />
                                        }
                                    </>
                                )}

                            </SwiperSlide>
                        )

                    })
                    :""
                }
            </Swiper>
        </div>
    )
}