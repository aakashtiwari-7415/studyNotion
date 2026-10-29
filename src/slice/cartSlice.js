import { createSlice } from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"


const initialState = {
    cart:localStorage.getItem("cart") ?
    JSON.parse(localStorage.getItem("cart")) :
    [],
    total:localStorage.getItem("total") ?
    JSON.parse(localStorage.getItem("total")):
    0,
    totalItems: localStorage.getItem("totalItems") ? 
    JSON.parse(localStorage.getItem("totalItems")) : 
    0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state ,value) {
            state.totalItems = value.payload;
        },
        // addToCart:(state,value) => {
        //     const course = action.payload;
        //     const index = state.cart.findIndex((item) => item_id === course._id)
            
        //     if(index >= 0){
        //         toast.error("Course already in cart")
        //         return
        //     }

        //     state.cart.push(course)

        //     state.totalItems++
        //     state.total += course.price

        //     localStorage.setItem("cart", JSON.stringify(state.cart))
        //     localStorage.setItem("total" ,JSON.stringify(state.total))
        //     localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

        //     toast.success("Course added to Cart")
        // }
        // //add to cart 
        //remove the cart
        //reset cart
        resetCart:(state) =>{
            state.cart = []
            state.total = 0
            state.totalItems =0

            //update to localstoroage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    },
});

export const {setTotalItems , resetCart} = cartSlice.actions;
export default cartSlice.reducer;