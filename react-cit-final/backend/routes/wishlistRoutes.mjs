import {addItemToWishlist, createWishlist, getWishlist, getWishlistById} from "../controllers/wishlistController.mjs";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getWishlist)

// express router method to create route for getting users by id
router.route('/:id').get(getWishlistById)

router.route('/new').post(createWishlist)

router.route('/add/:id/:slug').post(addItemToWishlist)

export default router