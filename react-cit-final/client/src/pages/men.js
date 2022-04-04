import Container from "../components/Container";
import ProductSlide from "../components/ProductSlide";
import ProductLayout from "../components/ProductLayout";
import ProductGrid from "../components/ProductGrid";


export default function Men(){
    const category = "Mens"

    return(
        <>
            <ProductLayout title="Men's Clothing">
                <ProductGrid title="Men's Clothing"  category={category}/>
            </ProductLayout>
        </>
    )
}