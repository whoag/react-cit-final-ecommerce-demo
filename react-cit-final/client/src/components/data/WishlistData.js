import axios from "axios";


export async function wishlistData(){
    let products = []
    const wishlistId = localStorage.getItem('wish')

    const wishlistProducts = await axios.get(
        `http://localhost:5000/api/wishlist/${wishlistId}`,
        { headers: { 'Access-Control-Allow-Origin': '*'}, params: {id: wishlistId}}
    ).then((res)=>{
        return res.data.product_ids
    })

    for (let i = 0; i< wishlistProducts.length; i++ ){
         await axios.get(
            `http://localhost:5000/api/products/search/${ wishlistProducts[i]}`,
            { headers: { 'Access-Control-Allow-Origin': '*'}, params: {slug: wishlistProducts[i]}}
        ).then((item)=>{
            products.push(item.data)
        })
    }

    return products

}