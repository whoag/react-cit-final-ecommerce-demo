
import ProductLayout from "../components/ProductLayout";
import ProductGrid from "../components/ProductGrid";


export default function Accessories(){
    const category = "Accessories"

    return(
        <>
            <ProductLayout title="Accessories">
                <ProductGrid title="Accessories"  category={category}/>
            </ProductLayout>
        </>
    )
}