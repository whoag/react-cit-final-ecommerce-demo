
import ProductLayout from "../components/ProductLayout";
import ProductGrid from "../components/ProductGrid";


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