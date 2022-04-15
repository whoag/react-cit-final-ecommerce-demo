
import React, {useEffect, useState} from "react"
import { reducer, initialState } from "./reducer"

export const UserContext = React.createContext(null)

export const UserProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)


    useEffect(()=>{
       if(state.auth){
          localStorage.setItem('id',state.id)
           localStorage.setItem('admin',state.admin)
           localStorage.setItem('email',state.email)
           localStorage.setItem('name',state.name)
           localStorage.setItem('auth',state.auth)
           localStorage.setItem('wish',state.wishlist)
       }
    }, [state])
    return (
        <UserContext.Provider value={[ state, dispatch ]}>
            { children }
        </UserContext.Provider>
    )
}