import React from "react";
import { Navigation } from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import {ProductData} from "./data/ProductData";
import ProductCard from "./ProductCard";

import 'swiper/css'


export default function ProductSlide(){

    return(
        <div className="h-64 max-w-screen">
            <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={4}
                navigation
                style={{height: '100%', padding: '0 20px'}}
            >
                {
                    ProductData.map((product, idx) => {
                        return(
                                <SwiperSlide>
                                    <ProductCard
                                        key={idx}
                                        title={product.title}
                                        image={product.image}
                                        slug={product.slug}
                                        description={product.description}
                                        price={product.price}/>
                                </SwiperSlide>
                            )

                    })
                }
            </Swiper>
        </div>
    )
}