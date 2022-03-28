import mongoose from 'mongoose'

const wishlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    product_ids: {
        type: Array,
        required: false
    }
}, {
    collection: 'wishlist'
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export default Wishlist