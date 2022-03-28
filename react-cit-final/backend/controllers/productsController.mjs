import Product from '../models/productModel.mjs'
import asyncHandler from 'express-async-handler'



export const getProducts = asyncHandler(async(req, res) => {
    const users = await Product.find({})
    console.log(users)
    res.json(users)
})

//getUserById function to retrieve user by id
export const getProductById  = asyncHandler(async(req, res) => {
    const user = await Product.findById(req.params.id)

    //if user id match param id send user else throw error
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})
