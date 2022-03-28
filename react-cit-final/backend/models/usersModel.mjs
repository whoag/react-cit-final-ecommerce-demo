import mongoose from 'mongoose'
export let userNum = 0;
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    wishlist_ids: {
        type: Array,
        required: false,
    }
}, {
    collection: 'user'
})

const User = mongoose.model('User', userSchema)

export default User