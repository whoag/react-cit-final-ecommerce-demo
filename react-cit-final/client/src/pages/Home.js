import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";
import Hero from "../components/Home/Hero";
import FeaturedSlide from "../components/FeaturedSlide";

export default function Home(){
    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        });
    });
    return(
        <>
            <Hero />
            <div className="flex flex-col   w-screen  min-h-screen">
                <div className="grid grid-col-1 place-items-center py-6 h-44">
                    <div className="text-center divide-y divide-solid">
                        <h1 className="text-5xl">I WANT THIS</h1>
                        <p className="pt-3">Feel free to browse and dream of consuming the things which you cannot consume because they do not exist.</p>

                    </div>

                </div>
                <div className="w-full grid grid-cols-1 bg-pink-50 py-6 ">
                    <h2 className="place-self-center text-4xl">ALL PRODUCTS</h2>
                    <FeaturedSlide/>
                </div>

            </div>
        </>
    );

}