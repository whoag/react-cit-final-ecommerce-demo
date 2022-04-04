import {
    getProducts,
    getProductById,
    getProductByCategory,
    getProductBySlug
} from "../controllers/productsController.mjs";
import express from 'express'
import {getCategoryById} from "../controllers/categoriesController.mjs";
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getProducts)

// express router method to create route for getting users by id
router.route('/:category').get(getProductByCategory)

router.route('/search/:slug').get(getProductBySlug)
export default router