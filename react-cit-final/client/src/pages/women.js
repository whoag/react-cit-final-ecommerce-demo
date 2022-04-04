import Container from "../components/Container";
import ProductSlide from "../components/ProductSlide";
import ProductLayout from "../components/ProductLayout";
import ProductGrid from "../components/ProductGrid";
import axios from "axios";
import {useEffect, useState} from "react";


export default function Women(){
  const category = "Womens"
    return(
       <>
           <ProductLayout title="Women's Clothing">
               <ProductGrid title="Women's Clothing"  category={category}/>
           </ProductLayout>
       </>
    )
}