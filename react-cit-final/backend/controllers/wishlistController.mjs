import Wishlist from '../models/wishlistModel.mjs'
import asyncHandler from 'express-async-handler'
import User from "../models/usersModel.mjs";


//getUsers function to get all users
export const getWishlist = asyncHandler(async(req, res) => {
    const users = await Wishlist.find({})
    res.json(users)
})

//getUserById function to retrieve user by id
export const getWishlistById  = asyncHandler(async(req, res) => {
    const wish = await Wishlist.findById(req.params.id)

    //if user id match param id send user else throw error
    if(wish){
        res.json(wish)
    }else{
        res.status(404).json({message: "Wishlist not found"})
        res.status(404)
        throw new Error('Wishlist not found')
    }
})

export const createWishlist  = asyncHandler(async(req, res) => {
    const wishlist = new Wishlist({
        name: "My Wishlist",
        product_ids:[req.params.slug]
    })
    wishlist.save().catch(err => console.log(0));
    const wishId = wishlist.id
    const userID = req.params.user
    await User.findByIdAndUpdate(
        userID,
        {wishlist: wishId},
        {safe: true},
        function(err, doc) {
            if(err){
                console.log(1)
            }
        }).clone().catch(function err(){
            return res.status(500)
    })
    return res.status(200).json({wishlist})

})

export const addItemToWishlist  = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const slug = req.params.slug
     if(await checkDuplicate(id,slug)){
         await Wishlist.findByIdAndUpdate(
             id,
             {$push: {product_ids: slug}},
             {safe: true, upsert: true},
             function(err, doc) {
                 if(err){
                     console.log(1)
                 }
             }).then(()=>{
             return res.status(200)
         })
     }else{
         return res.status(200).json("Product already in wishlist")
     }

})

async function checkDuplicate(id, slug){
    const wishlist = await Wishlist.findById(id)

    const products = wishlist.product_ids

    return !products.includes(slug);

}