export const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                id: action.id,
                name: action.name,
                email: action.email,
                wishlist: action.wishlist,
                admin: action.admin,
                auth: action.auth,
            }
        case "LOGOUT":
            return {
                id: "",
                name:"",
                email: "",
                wishlist: "",
                admin: false,
                auth: false,
            }

        default:
            return state
    }
}

export const initialState = {
    id: "",
    name: "",
    email: "",
    wishlist: "",
    admin: false,
    auth: false,
}