import Container from "../components/Container";
import ProductSlide from "../components/ProductSlide";
import ProductLayout from "../components/ProductLayout";
import ProductGrid from "../components/ProductGrid";


export default function Women(){

    return(
       <>
           <ProductLayout title="Women's Clothing">
               <ProductGrid title="Women's Clothing"/>
           </ProductLayout>
       </>
    )
}