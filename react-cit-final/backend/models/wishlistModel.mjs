import mongoose from 'mongoose'

const wishlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "My Wishlist"

    },
    product_ids: {
        type: Array,
        required: true
    }
}, {
    collection: 'wishlist'
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export default Wishlist