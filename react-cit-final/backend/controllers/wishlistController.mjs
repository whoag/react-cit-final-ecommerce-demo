import Wishlist from '../models/wishlistModel.mjs'
import asyncHandler from 'express-async-handler'


//getUsers function to get all users
export const getWishlist = asyncHandler(async(req, res) => {
    const users = await Wishlist.find({})
    res.json(users)
})

//getUserById function to retrieve user by id
export const getWishlistById  = asyncHandler(async(req, res) => {
    const user = await Wishlist.findById(req.params.id)

    //if user id match param id send user else throw error
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})

export const createWishlist  = asyncHandler(async(req, res) => {
    const wishlist = new Wishlist({
        name: "My Wishlist",
        product_ids:[]
    })
    wishlist.save().catch(err => console.log(0));
    return res.status(200).json({wishlist})

})

export const addItemToWishlist  = asyncHandler(async(req, res) => {
    console.log(req.params)
    const id = req.params.id;
    const slug = req.params.slug
    await Wishlist.findByIdAndUpdate(
        id,
        {$push: {product_ids: slug}},
        {safe: true, upsert: true},
        function(err, doc) {
                    if(err){
                       console.log(1)
                    }
            })
})

