import { getProducts, getProductById } from "../controllers/productsController.mjs";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getProducts)

// express router method to create route for getting users by id
router.route('/:id').get(getProductById)

export default router