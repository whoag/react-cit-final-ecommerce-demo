import React from "react";
import { Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import {ProductData} from "./data/ProductData";
import ProductCard from "./ProductCard";


import 'swiper/css'
import 'swiper/css/autoplay';


export default function FeaturedSlide(){

    return(
        <div className="h-80 max-w-screen pt-6 ">
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
                {
                    ProductData.map((product, idx) => {
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
                                                title={product.title}
                                                image={product.image}
                                                description={product.description}
                                                price={product.price}
                                                active
                                            />
                                            : <ProductCard
                                                key={idx}
                                                title={product.title}
                                                image={product.image}
                                                description={product.description}
                                                price={product.price}
                                            />
                                        }
                                    </>
                                )}

                            </SwiperSlide>
                        )

                    })
                }
            </Swiper>
        </div>
    )
}