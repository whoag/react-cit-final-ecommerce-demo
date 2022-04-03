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
        type: ObjectId,
        required: false
    },
    price: {
        type: Number,
        required: true,

    },
    category_id: {
        type: ObjectId,
        required: true
    }
}, {
    collection: 'products'
})

const Product = mongoose.model('Product', productSchema)

export default Product