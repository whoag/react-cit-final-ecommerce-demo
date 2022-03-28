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
        type: Object,
        required: false,
        data: Buffer,
        unique: true
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
    collection: 'product'
})

const Product = mongoose.model('Product', productSchema)

export default Product