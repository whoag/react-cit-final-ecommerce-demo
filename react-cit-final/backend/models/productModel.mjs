import mongoose from 'mongoose'
import {ObjectId, Double} from "mongodb";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true,

    },
    category: {
        type: String,
        required: true
    }
}, {
    collection: 'products'
})

const Product = mongoose.model('Product', productSchema)

export default Product