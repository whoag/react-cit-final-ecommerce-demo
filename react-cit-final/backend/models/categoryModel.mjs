import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
}, {
    collection: 'category'
})

const Category = mongoose.model('Category', categorySchema)

export default Category