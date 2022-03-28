import { getCategory, getCategoryById } from "../controllers/categoriesController.mjs";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getCategory)

// express router method to create route for getting users by id
router.route('/:id').get(getCategoryById)

export default router