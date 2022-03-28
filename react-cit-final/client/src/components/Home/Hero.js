import React from "react";
import {Pagination, Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import '../../style/index.css';

import 'swiper/css'
import 'swiper/css/autoplay';
export default function Hero(){

    return(
        <div className="hero max-w-screen pt-24 pb-0">
            <Swiper
                loop={true}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}

                style={{height: '100%'}}
            >
                <SwiperSlide>
                    <div className="hero1 text-white w-full h-full">
                        <div className="bg-black bg-opacity-50 text-white w-full h-full grid grid-cols-1 grid-rows-1 place-items-center text-5xl">
                          <h1>CONSUME</h1>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero2 text-white w-full h-full">
                        <div className="bg-black bg-opacity-50 text-white w-full h-full grid grid-cols-1 grid-rows-1 place-items-center text-5xl">
                            <h1>BUY THE THINGS</h1>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero3 text-white w-full h-full">
                        <div className="bg-black bg-opacity-50 text-white w-full h-full grid grid-cols-1 grid-rows-1 place-items-center text-5xl">
                           <h1> YOU WANT THE THINGS</h1>
                        </div>

                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}