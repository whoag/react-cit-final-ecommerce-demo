import Category from '../models/categoryModel.mjs'
import asyncHandler from 'express-async-handler'
//getUsers function to get all users
export const getCategory = asyncHandler(async(req, res) => {
    const users = await Category.find({})
    res.json(users)
})

//getUserById function to retrieve user by id
export const getCategoryById  = asyncHandler(async(req, res) => {
    const user = await Category.findById(req.params.id)

    //if user id match param id send user else throw error
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})