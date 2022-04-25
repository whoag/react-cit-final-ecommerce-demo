
import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {HeartIcon as HeartOutline}  from "@heroicons/react/outline";
import {HeartIcon as HeartSolid} from "@heroicons/react/solid";
import axios from "axios";


export default function ProductCard({title, image, description, price, active, slug}){
    const [heart, setHeart] = useState(false)

   async function addToWishList() {
        setHeart(true)
       if(localStorage.getItem('auth') === 'true'){
           if(localStorage.getItem('wish') === 'undefined' || localStorage.getItem('wish') === '' ){
               const user = localStorage.getItem('id')
               await axios.post(
                   `http://localhost:5000/api/wishlist/new/${user}/${slug}`,
                   "",
                   { headers: { 'Access-Control-Allow-Origin': '*'}, params: {user: user, slug:slug}}
               ).then((wish)=>{
                   localStorage.setItem('wish',wish.data.wishlist._id)
               })
           }
           else if(localStorage.getItem('wish') !== '' || localStorage.getItem('wish') !== 'undefined'){
               const wishId = localStorage.getItem('wish')
               await axios.post(
                   `http://localhost:5000/api/wishlist/add/${wishId}/${slug}`,
                   "",
                   { headers: { 'Access-Control-Allow-Origin': '*'}, params:{id:wishId, slug: slug}}
               ).then((res)=>{

               }).catch((err)=>{
                   console.log(err)
               })
           }
       }



    }

    function removeFromWishlist() {
        setHeart(false)
    }

    return(
        <div className={ active ? 'scale-125' : ''} style={{height: '200px', width: '150px'}}>
            <Link  to={`/product/${slug}`}>
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                        src={image}
                        alt={description}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                </div>
            </Link>
            <div className="grid grid-cols-2 grid-rows-1">
                <div>
                    <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
                </div>
                {heart
                    ?<HeartSolid className="w-6 h-6 place-self-end" onClick={removeFromWishlist}/>
                    :<HeartOutline className="w-6 h-6 place-self-end" onClick={addToWishList} />
                }

            </div>

        </div>

    )
}