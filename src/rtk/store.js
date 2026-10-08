import { configureStore } from "@reduxjs/toolkit";
import bookReucer from "./slices/books-slice"
import cartReducer from "./slices/cart-slice"

export const store = configureStore({
    reducer:{
        books: bookReucer,
        cart:cartReducer
    }
})